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
          setStorage((prevStorage) => [...prevStorage, newVid]);

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

  const nextVideo = () => {
    console.log("Next video...");

    updateStorage(current);

    updateHistory(current);

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

  function updateStorage(currentVideo) {
    console.log("Updating storage...");
    const updateVid = storage.find((vid) => vid.id === currentVideo.id);

    if (!updateVid) {
      console.error("Could not find video in storage to update.");
      return;
    }

    updateVid.plays++;
    updateVid.lastPlayed = new Date();
    const updatedStorage = storage.map((vid) => {
      if (vid.id === updateVid.id) {
        return updateVid;
      }
      return vid;
    });
    setStorage(updatedStorage);
  }

  function updateHistory(currentVideo) {
    console.log("Updating history...");
    const updateVid = history.find((vid) => vid.id === currentVideo.id);

    if (!updateVid) {
      setHistory((prevHistory) => [...prevHistory, currentVideo]);
      return;
    }

    updateVid.plays++;
    updateVid.lastPlayed = new Date();
    const filteredHistory = history.filter((vid) => vid.id !== updateVid.id);
    setHistory([...filteredHistory, updateVid]);
  }

  return (
    <videoContext.Provider
      value={{
        current,
        queue,
        history,
        secondsPlayed,
        playing,
        showVideo,
        setShowVideo,
        setPlaying,
        setSecondsPlayed,
        addQueueUrl,
        nextVideo,
      }}
    >
      {children}
    </videoContext.Provider>
  );
}
