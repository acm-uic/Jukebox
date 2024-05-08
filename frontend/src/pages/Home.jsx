import { useContext } from "react";
import { videoContext } from "../contexts/videoContext";
export default function Home() {
  const { queue, currentVideo, showing } = useContext(videoContext);
  //    console.log(current)

  const videoStyle = {
    display: showing ? "block" : "none",
  };

  return (
    <div className="min-h-screen w-full flex-grow flex flex-col items-center gap-2 text-white bg-neutral-800">
      {/*dummy copy of VideoPlayer to get the spacing correct and not interfere with page content */}
      <div className="flex flex-col item-center w-full">
        <div style={videoStyle} className="max-h-[415px] aspect-video">
          <div className="h-full aspect-video mx-auto"></div>
        </div>
        <form className="m-auto"></form>
        <button className="text-transparent mb-20">
          You are not supposed to see this
        </button>
      </div>

      {/* Actual Page Content */}
      <section className="w-full px-2">
        <div className="w-full h-full max-w-[752px] mx-auto space-y-2">
          <h1 className="text-3xl">Now Playing:</h1>
          {currentVideo && (
            <div className="w-full h-20 bg-red-600 rounded-lg">
              {currentVideo?.title}
            </div>
          )}
        </div>
      </section>
      <section className="w-full px-2">
        <div className="w-full h-full max-w-[752px] mx-auto space-y-2">
          <h1 className="text-3xl">Coming Up:</h1>
          {queue.length === 0 ? (
            <div className="w-full h-20 bg-red-600 text-center rounded-lg">
              No video in queue
            </div>
          ) : (
            queue.map((video, index) => (
              <div key={index} className="w-full h-20 bg-red-600 rounded-lg">
                {video.title}
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
