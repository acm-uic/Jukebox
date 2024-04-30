import ReactPlayer from "react-player";
import { videoContext } from "../domain/videoContext";
import { useContext, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { VideoPlayer } from "./VideoPlayer";

export const SongControl = () => {
  //Will add volume dial in future update

  const video = {
    id: 3,
    url: "Youtube.com",
    title: "No video",
    duration: 0,
    plays: 0,
    likes: 0,
    skips: 0,
    skiplimit: 10,
  };

 let {
    current,
    secondsPlayed,
    nextVideo,
  } = useContext(videoContext);

  if (Object.keys(current).length == 0) {
    current = video;
  }

  const { likes, skips, skiplimit, duration, title } = current;

  const [minimal, setMinimal] = useState(true);

  const durationString = new Date(duration * 1000)
    .toISOString()
    .substring(14, 19);

  function handleSkip() {
    if (current == video) return;
    console.log("Skipping Song...");
    nextVideo();
  }

  return (
    <>
      <VideoPlayer />

      <div
        onMouseEnter={() => setMinimal(false)}
        onMouseLeave={() => setMinimal(true)}
        className="grid grid-cols-1 md:grid-rows-2 md:grid-flow-col self-center items-center w-full md:h-40 px-8 py-4 text-3xl md:text-4xl font-bold bg-neutral-900 text-white fixed bottom-0"
      >
        {/* The Title */}
        <p className="block mr-2 md:max-w overflow-x-auto overflow-y-hidden no-scrollbar whitespace-nowrap">
          Title: {title}
        </p>

        {/* Progress bar and time left */}
        <div className="flex gap-4 items-center">
          <div className="h-2 w-[800px] bg-slate-300">
            <div
              className="h-full bg-red-600"
              style={{ width: `${(secondsPlayed / current.duration) * 100}%` }}
            />
          </div>
          <p className="text-lg">{durationString}</p>
        </div>

        <div className="flex md:row-span-2 md:flex-col justify-between">
          {/* Stores # of skips */}
          <div
            className={
              minimal
                ? "hidden"
                : "flex items-center gap-4 h-16 text-xl md:text-2xl"
            }
          >
            <button
              onClick={() => handleSkip()}
              className="bg-neutral-600 w-36 h-10 rounded-l text-white"
            >
              Skip
            </button>
            <p>
              {skips}/{skiplimit}
            </p>
          </div>

          {/* Includes likes and count*/}
          <div
            className={
              minimal
                ? "hidden"
                : "flex flex-row md:justify-end items-center space-x-4"
            }
          >
            <img className="size-8 md:size-12" src="src/images/Like0.png" />
            <p className="flex">{likes}</p>
          </div>
        </div>
      </div>
    </>
  );
};
