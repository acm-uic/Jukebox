import { useState, useContext, useEffect } from "react";
import ReactPlayer from "react-player";
import { videoContext } from "../domain/videoContext";
export const VideoPlayer = () => {
  // Highly informed by this w3schools tutorial:
  // https://www.w3schools.com/react/react_forms.asp
  let {addQueueUrl, current, nextVideo} = useContext(videoContext)
  const [playerUrl, setPlayerUrl] = useState("");
  const [inputUrl, setInputUrl] = useState("");
  const [showVideo, setShowVideo] = useState(true);

  useEffect(() => {
    console.log("effect")
    console.log(current)
    setPlayerUrl(current.url);
  }, [current])

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
    <>
      <div className="flex flex-col item-center">
        <div style={videoStyle}>
          <ReactPlayer
            className="m-auto h-56 p-2 bg-black"
            url={playerUrl}
            playing={true}
            controls
            width="480px"
            height="270px"
            onEnded={() => nextVideo()}
          />
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
    </>
  );
};
