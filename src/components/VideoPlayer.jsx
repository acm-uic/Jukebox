import { useState, useContext, useEffect, useRef } from "react";
import ReactPlayer from "react-player";
import { videoContext } from "../domain/videoContext";
import { useLocation } from "react-router-dom";
export const VideoPlayer = () => {
  const location = useLocation();
  // Highly informed by this w3schools tutorial:
  // https://www.w3schools.com/react/react_forms.asp
  let {
    addQueueUrl,
    playing,
    setPlaying,
    setSecondsPlayed,
    current,
    nextVideo,
    showVideo,
    setShowVideo,
  } = useContext(videoContext);

  const [inputUrl, setInputUrl] = useState("");
  const playerRef = useRef();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const success = await addQueueUrl(inputUrl);
    setInputUrl("");
  };

  const toggleVideo = () => {
    setShowVideo((prev) => !prev);
  };

  const videoStyle = {
    display: showVideo ? "block" : "none",
  };

  return (
    <div
      className={
        location.pathname == "/" ? "flex flex-col item-center w-screen top-24 absolute" : "hidden"
      }
    >
      <div
        style={videoStyle}
        className="max-h-[415px] aspect-video bg-black/85"
      >
        <div className="h-full aspect-video bg-black mx-auto">
          <ReactPlayer
            ref={playerRef}
            height={"100%"}
            width={"100%"}
            url={current.url}
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
      <form className="m-auto" onSubmit={handleSubmit}>
        <label>
          Enter a video URL:
          <input
            type="text"
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
          />
          <input type="submit" />
        </label>
      </form>
      <button onClick={toggleVideo}>
        {showVideo ? "Switch to Audio" : "Switch to Video"}
      </button>
    </div>
  );
};
