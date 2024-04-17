import { createContext, useEffect, useState } from "react";
import { extractVideoId, getVideoDetails } from "./getVideos";

export const videoContext = createContext();

export function VideoContextProvider({ children }) {
  const [storage, setStorage] = useState([]);
  const [history, setHistory] = useState([]);

  let [queue, setQueue] = useState([]);
  let [current, setCurrent] = useState({});

  const [secondsPlayed, setSecondsPlayed] = useState(0); // percentage played of current video
  const [playing, setPlaying] = useState(true); // whether the video is playing or not
  const [showVideo, setShowVideo] = useState(true);

  useEffect(() => {
    let savedStorage = localStorage.getItem("videoStorage");
    console.log("Loading:", savedStorage);
    if (savedStorage != null) {
      setStorage(JSON.parse(savedStorage));
    }
  }, []);

  // our video object contains: id, url, title, duration(seconds), plays, likes, skips, lastPlayed

  const addQueueUrl = async (videoUrl) => {
    const id = extractVideoId(videoUrl);
    const foundVid = storage.find((video) => video.id === id);

    if (foundVid) {
      console.log("foundVid in storge", foundVid);

      if (Object.keys(current).length === 0) {
        // If current is empty, set current to foundVid and start playing
        console.log("EMPTY CURRENT");
        setCurrent(foundVid);
        setPlaying(true);
        setSecondsPlayed(0);
        return true;
      }

      // if current is not empty, add foundVid end of queue
      setQueue((prevQueue) => [...prevQueue, foundVid]);
      return true;
    }

    if (id) {
      // If video is not in history, fetch video details
      try {
        const details = await getVideoDetails(
          id,
          import.meta.env.VITE_APP_YOUTUBE_APIKEY
        );

        if (details) {
          // If video details are successfully retrieved
          let newVid = {
            id: id,
            url: videoUrl,
            title: details.title,
            duration: details.duration,
            plays: 0,
            likes: 0,
            skips: 0,
            skiplimit: 5,
            lastPlayed: new Date(0),
          };
          console.log("made a newVid", newVid);
          // setStorage((prevStorage) => [...prevStorage, newVid]);

          if (Object.keys(current).length === 0) {
            console.log("EMPTY CURRENT");
            setCurrent(newVid);
            setPlaying(true);
            setSecondsPlayed(0);
            return true;
          }

          setQueue((prevQueue) => [...prevQueue, newVid]); // Use concat instead of push for immutability
          console.log("This is the queue", queue);
          return true;
        } else {
          // If video details could not be retrieved
          console.log("Video details could not be retrieved.");
          return false;
        }
      } catch (error) {
        // If an error occurs while fetching video details◘
        console.error("Error fetching video details:", error);
        return false;
      }
    } else {
      // If the video URL is invalid
      console.log("Invalid YouTube URL.");
      return false;
    }
  };

  const handleStart = () => {
    console.log("Starting Video");
    // Find the video in the storage array
    let updateVid = storage.find((vid) => vid.id === current.id);

    // If the video exists in the storage, update its properties
    if (updateVid) {
      updateVid.plays++;
      updateVid.lastPlayed = new Date();
      console.log("Updating existing video in storage");
    } else {
      // If the video does not exist in the storage, create a new video object
      console.log("Adding new video to storage");
      updateVid = {
        ...current,
        plays: 1,
        lastPlayed: new Date(),
      };
    }

    // Update the storage array with the updated or new video object
    setStorage((prev) => {
      // Check if the video already exists in the storage to avoid duplicates
      const existingIndex = prev.findIndex((vid) => vid.id === updateVid.id);
      if (existingIndex !== -1) {
        // If the video exists, replace it with the updated video object
        const updatedStorage = [...prev];
        updatedStorage[existingIndex] = updateVid;
        let storageJSON = JSON.stringify(updatedStorage);
        localStorage.setItem("videoStorage", storageJSON);
        return updatedStorage;
      } else {
        // If the video does not exist, add it to the storage array
        let storageJSON = JSON.stringify([...prev, updateVid]);
        localStorage.setItem("videoStorage", storageJSON);
        return [...prev, updateVid];
      }
    });

    
  };

  const nextVideo = () => {
    console.log("Next video...");

    if (queue.length == 0) {
      console.log("Queue is empty");
      setCurrent({}); // Revert to empty start state
      setSecondsPlayed(0);
      return;
    }
    setSecondsPlayed(0);
    setCurrent(queue[0]);
    setQueue(queue.slice(1));
  };

  return (
    <videoContext.Provider
      value={{
        current,
        queue,
        history,
        storage,
        secondsPlayed,
        playing,
        showVideo,
        setShowVideo,
        setPlaying,
        setSecondsPlayed,
        addQueueUrl,
        nextVideo,
        handleStart,
      }}
    >
      {children}
    </videoContext.Provider>
  );
}
