import { createContext, useState } from "react";
import { extractVideoId, getVideoDetails } from "./getVideos";

export const videoContext = createContext();
export function VideoContextProvider({ children }) {
  let [history, setHistory] = useState([]);
  let [queue, setQueue] = useState([]);
  let [current, setCurrent] = useState({});

  // our video object contains: id, url, title,duration(seconds),plays,likes,skips

  const addQueueUrl = async (videoUrl) => {
    const id = extractVideoId(videoUrl);
    const foundVid = history.find((video) => video.id === id);
    if (foundVid) {
       console.log("foundVid");
       setQueue(queue.concat([foundVid])); // Use concat instead of push for immutability
       setHistory(history.concat([foundVid]));
       if (Object.keys(current).length === 0) {
        console.log("EMPTY");
        nextVideo();
       }
       return true;
    }
    if (id) {
       try {
         const details = await getVideoDetails(id, import.meta.env.VITE_APP_YOUTUBE_APIKEY);
         if (details) {
           let newVid = {
             id: id,
             url: videoUrl,
             title: details.title,
             duration: details.duration,
             plays: 0,
             likes: 0,
             skips: 0,
             skiplimit: 5,
           };
           console.log("newVid");
           const newArray = queue.concat([newVid])
           queue = newArray
           setQueue(newArray); // Use concat instead of push for immutability
           setHistory(history.concat([newVid]))
           console.log(queue)
           if (Object.keys(current).length == 0) {
            console.log("EMPTY");
            nextVideo();
           }
           return true;
         } else {
           console.log("Video details could not be retrieved.");
           return false;
         }
       } catch (error) {
         console.error("Error fetching video details:", error);
         return false;
       }
    } else {
       console.log("Invalid YouTube URL.");
       return false;
    }
   };


  const nextVideo = () => {
    if (queue.length == 0) {
        setCurrent({}) // Revert to empty start state
        return
    }
    setCurrent(queue[0])
    setQueue(queue.slice(1))
  }

  return (
    <videoContext.Provider value={{ current, queue, addQueueUrl, nextVideo }}>
      {children}
    </videoContext.Provider>
  );
}
