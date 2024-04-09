import { videoContext } from "../domain/videoContext";
import { useContext, useState } from "react";

export const SongControl = () => {
  //Will add volume dial in future update

  let video = {
    id: 3,
    url: "Youtube.com",
    title: "No video",
    duration: 0,
    plays: 0,
    likes: 0,
    skips: 0,
    skiplimit: 10,
  };
  const [minimal, setMinimal] = useState(true);
  let { current, nextVideo } = useContext(videoContext);
  if (Object.keys(current).length == 0) {
    current = video;
  }
  const { likes, skips, skiplimit, duration, title } = current;
  const durationString = new Date(duration * 1000)
    .toISOString()
    .substring(14, 19);

  function handleSkip() {
    if (current == video) return;
    console.log("Skip");
    nextVideo();
  }

  return (
    <div
      onMouseEnter={() => setMinimal(false)}
      
      className="grid grid-cols-1 md:grid-rows-2 md:grid-flow-col self-center items-center w-full md:h-40 px-8 py-4 text-3xl md:text-4xl font-bold bg-neutral-900 text-white fixed bottom-0"
    >
      {/* The Title */}
      <p
        className={
          minimal
            ? "block mx-auto md:max-w overflow-x-auto overflow-y-hidden no-scrollbar whitespace-nowrap"
            : "block mr-2 md:max-w overflow-x-auto overflow-y-hidden no-scrollbar whitespace-nowrap"
        }
      >
        Title: {title}
      </p>

      {/* Progress bar and time left */}
      <div
        className={
          minimal
            ? "flex gap-4 items-center justify-center"
            : "flex gap-4 items-center"
        }
      >
        <progress className="w-[800px] h-2" />
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
  );
};
