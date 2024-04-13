import { useContext } from "react";
import { VideoPlayer } from "../components/VideoPlayer";
import { videoContext } from "../domain/videoContext";
export default function Home() {
  let { queue, current, showVideo } = useContext(videoContext);
  //    console.log(current)

  const videoStyle = {
    display: showVideo ? "block" : "none",
  };

  return (
    <div className="min-h-screen w-full flex-grow flex flex-col items-center">
      <div className="flex flex-col item-center w-screen">
        <div
          style={videoStyle}
          className="max-h-[415px] aspect-video"
        >
          <div className="h-full aspect-video mx-auto"></div>
        </div>
        <form className="m-auto">
          <label>
            Enter a video URL:
            <input type="text" />
            <input type="submit" />
          </label>
        </form>
        <button>You are not supposed to see this</button>
      </div>

      {/* Actual Page Content */}
      {current && (
        <div>
          <h1 className="text-3xl">Current</h1>
          {current.title}
        </div>
      )}
      <div>
        <h1 className="text-3xl">Queue</h1>
        {queue.map((vid, index) => (
          <h2 key={index}>{vid.title}</h2>
        ))}
      </div>
    </div>
  );
}
