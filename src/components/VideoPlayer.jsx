import { useEffect, useState } from "react";
import ReactPlayer from "react-player";

export const VideoPlayer = () => {
  // Highly informed by this w3schools tutorial:
  // https://www.w3schools.com/react/react_forms.asp
  const [playerUrl, setPlayerUrl] = useState("");
  const [inputUrl, setInputUrl] = useState("");
  const [hideVideo, setHideVideo] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setPlayerUrl(inputUrl);
  };

  const handleHideVideo = () => {
    setHideVideo(!hideVideo);
  }


  return (
    <>
      <div className="flex flex-col item-center">
      <div className={( hideVideo ? 'collapse':'')}>
        <ReactPlayer className="m-auto h-56 p-2 bg-black" url={playerUrl}/>
      </div>
        <input type="button" value={(hideVideo?"Show":"Hide")+ " Video"} onClick={handleHideVideo} />
        <form className="m-auto" onSubmit={handleSubmit}>
          <label>
            Enter a video URL:
            <input
              type="text"
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
            />
            <input type= "submit" />
          </label>
        </form>
      </div>
    </>
  );
};
