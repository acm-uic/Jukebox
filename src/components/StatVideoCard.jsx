import React, { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";

export default function StatVideoCard({ video }) {
  //taking title as string, length as seconds, url as string
  const { title, length, url } = video;
  const lengthString = new Date(length * 1000).toISOString().substring(14, 19);

  const [showUrl, setShowUrl] = useState(false);

  function handleClick() {
    // Add what happens if the Queue button is pressed
  }

  return (
    <div className="w-full md:h-[108px] bg-[#464545] flex flex-col md:flex-row md:gap-0 gap-2 justify-between items-center text-[#ffffff] py-2 px-3 rounded font-bold">
      <div className="h-full w-full flex flex-col md:justify-around md:w-3/4">
        <div className="block md:max-w md:text-4xl text-3xl overflow-hidden whitespace-nowrap text-ellipsis">
          {title}
        </div>
        <div className="flex items-center">
          <button
            onClick={() => setShowUrl(!showUrl)}
            className="text-sm active:scale-90 active:text-gray-500 transition duration-100 ease-in-out"
          >
            <img src="/copyIcon.png" />
          </button>
          {showUrl && (
            <CopyToClipboard text={url}>
              <button className="text-sm active:scale-90 active:text-gray-500 transition duration-100 ease-in-out">
                {url}
              </button>
            </CopyToClipboard>
          )}
        </div>
      </div>
      <div className="w-full h-full flex flex-col md:items-end justify-between md:w-1/4">
        <div className="text-sm h-1/4">{`LENGTH: ${lengthString}`}</div>
        <button
          onClick={handleClick}
          className="text-2xl h-3/4 active:scale-90 active:text-gray-500 transition duration-100 ease-in-out"
        >
          ADD TO QUEUE
        </button>
      </div>
    </div>
  );
}
