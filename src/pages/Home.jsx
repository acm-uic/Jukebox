import { useContext } from "react";
import { VideoPlayer } from "../components/VideoPlayer";
import { videoContext } from "../domain/videoContext";
export default function Home() {
  let { queue, current } = useContext(videoContext);
  //    console.log(current)
  return (
    <div className="w-full min-h-screen">
      <VideoPlayer />
      {current && (
        <div>
          <h1 className="text-3xl">Current</h1>
          {current.title}
        </div>
      )}
      <h1 className="text-3xl">Queue</h1>
      {queue.map((vid, index) => (
        <h1 key={index}>{vid.title}</h1>
      ))}
    </div>
  );
}
