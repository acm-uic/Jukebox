import { createContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io(import.meta.env.VITE_APP_BACKEND_URL);

export const videoContext = createContext();

export function VideoContextProvider({ children }) {
  const [queue, setQueue] = useState([]);
  const [currentVideo, setCurrentVideo] = useState(null);

  const [playing, setPlaying] = useState(true);
  const [showing, setShowing] = useState(true);
  

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

    fetchQueue();

    socket.on("queueUpdated", ({ queue }) => {
      console.log("Queue updated", queue);
      setQueue(queue);
    });

    socket.on("currentVideoChanged", ({ currentVideo }) => {
      console.log("Current video changed", currentVideo.title);
      setCurrentVideo(currentVideo);
    });

    return () => {
      socket.off("queueUpdated");
      socket.off("currentVideoChanged");
    };

  }, []);

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

  return (
    <videoContext.Provider
      value={{
        queue,
        addVideoToQueue,
        currentVideo,
      }}
    >
      {children}
    </videoContext.Provider>
  );
}
