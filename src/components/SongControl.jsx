import { videoContext } from "../domain/videoContext";
import { useContext } from "react";

export const SongControl = () => {
  {
    /**Will add volume dial in future */
  }

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

  let { current } = useContext(videoContext);
  if (Object.keys(current).length == 0) {
    current = video;
  }
  const { likes, skips, skiplimit, duration, title } = current;
  const durationString = new Date(duration * 1000)
    .toISOString()
    .substring(14, 19);

  return (
    <div className="grid grid-cols-1 md:grid-rows-2 md:grid-flow-col self-center items-center w-screen px-8 py-4 text-3xl md:text-4xl font-bold bg-neutral-900 text-white fixed bottom-0">
      {/* The Title */}
      <p className="block md:max-w overflow-x-auto overflow-y-hidden no-scrollbar whitespace-nowrap">Title: {title}</p>

      {/* Progress bar and time left */}
      <div className="flex gap-4 items-center">
        <progress className=" w-[800px] h-2"/>
        <p className="text-lg">{durationString}</p>
      </div>

      {/* Stores # of skips */}
      <div className="flex items-center gap-4 h-16 text-xl md:text-2xl">
        <button className="bg-neutral-600 w-36 h-10 rounded-l text-white">
          Skip
        </button>
        <p>
          {skips}/{skiplimit}
        </p>
      </div>

      {/* Includes likes and count*/}
      <div className="flex flex-row md:justify-end items-center space-x-4">
        <img className="size-8 md:size-12" src="src/images/Like0.png" />
        <p className="flex">{likes}</p>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col md:flex-row self-center items-center w-screen md:h-32 p-8 text-4xl font-bold bg-neutral-900 text-white fixed bottom-0">
      {/*Centering stores title and playback bar */}
      <div className="flex flex-col w-full space-y-4 self-center">
        {/*The Title*/}
        <p className="flex justify-start items-center">Title: {title}</p>
        {/*Progress bar and time left */}
        <div className="flex space-x-10 items-center self-end">
          <progress className=" w-[800px] h-2"></progress>
          <p className="text-lg">{durationString}</p>
        </div>
      </div>

      {/* Stores skip count and likes count */}
      <div className="flex flex-col justify-center space-y-4 h-20 items-end w-150 text-3xl text-gray-400">
        {/**Stores # of skips */}
        <div className="flex space-x-8 h-16 text-2xl0">
          <button className="bg-neutral-600 w-36 h-10 rounded-l text-white">
            Skip
          </button>
          <p>
            {" "}
            {skips}/{skiplimit}
          </p>
        </div>

        {/* Includes likes and count*/}
        <div className="flex flex-row items-center space-x-4">
          <img className="h-12 w-12" src="src/images/Like0.png" />
          <p className="flex">{likes}</p>
        </div>
      </div>
    </div>
  );
};
