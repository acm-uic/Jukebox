import { createContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

//connects to the backend
const socket = io(import.meta.env.VITE_APP_BACKEND_URL);

export const videoContext = createContext();

export function VideoContextProvider({ children }) {
  const [queue, setQueue] = useState([]);
  const [currentVideo, setCurrentVideo] = useState(null);

  const [playing, setPlaying] = useState(true);
  const [showing, setShowing] = useState(true);

  const [playedSeconds, setPlayedSeconds] = useState(0);
  const [skips, setSkips] = useState(0);
  

  useEffect(() => {
    
    async function fetchQueue() {
      const response = await fetch(`${import.meta.env.VITE_APP_BACKEND_URL}/songs/queue`);
      const queueData = await response.json();

      if (!response.ok) {
        console.error("Failed to fetch queue");
        return;
      }

      console.log("Queue fetched successfully", queueData);
      setQueue(queueData);
    }

    async function fetchCurrentVideo() {
      const response = await fetch(`${import.meta.env.VITE_APP_BACKEND_URL}/songs/current`);
      const currentData = await response.json();

      if (!response.ok) {
        console.error("Failed to fetch currentVideo");
        return;
      }

      console.log("currentVideo fetched successfully", currentData);
      setCurrentVideo(currentData);
    }

    fetchCurrentVideo();
    fetchQueue();

    //Listen for events
    socket.on("queueUpdated", ({ queue }) => {
      console.log("Queue updated", queue);
      setQueue(queue);
    });

    socket.on("currentVideoChanged", ({ currentVideo }) => {
      console.log("Current video changed", currentVideo);
      setCurrentVideo(currentVideo);
    });
    
    socket.on("skipCountUpdated", ({ skipCount }) => {
      console.log("Skip count updated", skipCount);
      setSkips(skipCount);
    });

    return () => {
      //Cleanup
      socket.off("queueUpdated");
      socket.off("currentVideoChanged");
      socket.off("skipCountUpdated");
    };

  }, []);

  //Add video to queue through POST request
  async function addVideoToQueue(url) {
    const response = await fetch(
      `${import.meta.env.VITE_APP_BACKEND_URL}/songs/url`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      }
    );

    if (!response.ok) {
      console.error("Failed to add video");
      return;
    }

    console.log("Video added successfully");
  }

  function skipVideo() {
    socket.emit("skipRequest");
  }

  return (
    <videoContext.Provider
      value={{
        socket,
        queue,
        addVideoToQueue,
        currentVideo,
        showing,
        setShowing,
        playing,
        setPlaying,
        playedSeconds,
        setPlayedSeconds,
        skips,
        skipVideo,
      }}
    >
      {children}
    </videoContext.Provider>
  );
}
