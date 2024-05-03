import { useState, useContext, useRef, useEffect } from "react";
import ReactPlayer from "react-player";
import { useLocation } from "react-router-dom";
import { videoContext } from "../domain/videoContext";

export const VideoPlayer = () => {
  const location = useLocation();
  // Highly informed by this w3schools tutorial:
  // https://www.w3schools.com/react/react_forms.asp

  const { addVideoToQueue, currentVideo } = useContext(videoContext);

  
  const showVideo = true;
  const setShowVideo = () => {};
  const playing = true;
  
  const [inputUrl, setInputUrl] = useState("");
  const playerRef = useRef();

  useEffect(() => {
    if(currentVideo && playerRef.current) {
      playerRef.current.seekTo(0);
    }
  }, [currentVideo])


//handles submitting url to queue
  const handleSubmit = async () => {
    addVideoToQueue(inputUrl);
    setInputUrl("");
  };

  //handles viewing the player
  const toggleVideo = () => {
    setShowVideo((prev) => !prev);
  };

  const videoStyle = {
    display: showVideo ? "block" : "none",
  };

  return (
    <div
      className={
        location.pathname == "/"
          ? "flex flex-col item-center w-full top-24 absolute"
          : "hidden"
      }
    >
      <div
        style={videoStyle}
        className="max-h-[415px] aspect-video bg-neutral-900"
      >
        <div className="h-full aspect-video bg-black mx-auto">
          <ReactPlayer
            ref={playerRef}
            height={"100%"}
            width={"100%"}
            url={currentVideo?.url}
            playing={playing}
            controls
            progressInterval={100}
            onPause={() => setPlaying(false)}
            onPlay={() => setPlaying(true)}
            onProgress={({ playedSeconds }) => setSecondsPlayed(playedSeconds)}
            onEnded={() => nextVideo()}
          />
        </div>
      </div>
      <div className="flex p-2 gap-4 w-full max-w-[768px] mx-auto">
        <div className="text-white flex-grow m-auto" onSubmit={handleSubmit}>
          <label className="text-sm md:text-lg">
            Enter a video URL:
            <input
              type="text"
              className="text-black px-1 block w-full text-base max-w-[480px]"
              value={inputUrl}
              placeholder="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
              onChange={(e) => setInputUrl(e.target.value)}
            />
          </label>
        </div>
        <div className="flex flex-col gap-1">
          <button
            className="w-40 mx-auto text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center"
            onClick={toggleVideo}
          >
            {showVideo ? "Switch to Audio" : "Switch to Video"}
          </button>
          <button onClick={handleSubmit} className="w-40 mx-auto text-white bg-red-800 hover:bg-red-900 focus:outline-none focus:ring-2 focus:ring-red-400 font-medium rounded-full text-sm px-5 py-2.5 text-center">
            Add to Queue
          </button>
        </div>
      </div>
    </div>
  );
};
