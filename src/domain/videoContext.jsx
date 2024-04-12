import { createContext, useEffect, useState } from "react";
import { extractVideoId, getVideoDetails } from "./getVideos";

export const videoContext = createContext();

export function VideoContextProvider({ children }) {
  const [history, setHistory] = useState([]);
  let [queue, setQueue] = useState([]);
  let [current, setCurrent] = useState({});
  const [secondsPlayed, setSecondsPlayed] = useState(0); // percentage played of current video
  const [playing, setPlaying] = useState(true); // whether the video is playing or not

  /*useEffect(() => {
    console.log("secondsPlayed", secondsPlayed);
    console.log("playing", playing);
  }, [secondsPlayed, playing]);*/
  // our video object contains: id, url, title, duration(seconds),plays,likes,skips

  const addQueueUrl = async (videoUrl) => {
    const id = extractVideoId(videoUrl);
    const foundVid = history.find((video) => video.id === id);

    if (foundVid) {
      console.log("FoundVideo in history", foundVid);
      if (Object.keys(current).length === 0) {
        // If current is empty, set current to foundVid and update history
        console.log("EMPTY", queue);
        setCurrent(foundVid);
        setPlaying(true);
        setSecondsPlayed(0);
        setHistory((prevHistory) => [...prevHistory, {...foundVid, lastPlayed: new Date()}]);
        return true;
      }

      setQueue((prevQueue) => [...prevQueue, foundVid]); // if current is not empty, add foundVid to queue and update history
      setHistory((prevHistory) => [...prevHistory, {...foundVid, lastPlayed: new Date()}]);
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
            lastPlayed: new Date(),
          };
          console.log("newVid");
          const newArray = queue.concat([newVid]);
          queue = newArray;
          setQueue(newArray); // Use concat instead of push for immutability
          setHistory(history.concat([newVid]));
          console.log(queue);
          if (Object.keys(current).length === 0) {
            console.log("EMPTY");
            setPlaying(true);
            nextVideo();
          }
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
      value={{ current, queue, history, secondsPlayed, playing, setPlaying, setSecondsPlayed, addQueueUrl, nextVideo }}
    >
      {children}
    </videoContext.Provider>
  );
}
