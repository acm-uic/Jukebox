import React, { useState } from "react";
import StatVideoCard from "../components/StatVideoCard";

export default function StatsPage() {
  //using plays as int, likes as int, and recency as an int
  const videoList = [
    {
      title: "Do I Wanna Know?hbjhbiuhnuinuhijdklaskdlsadjlaks",
      url: "https://www.youtube.com/watch?v=bpOSxM0rNPM",
      length: 365,
      plays: 1627943000,
      likes: 9600000,
      recency: 3,
    },
    {
      title: "As It Was",
      url: "https://www.youtube.com/watch?v=H5v3kku4y6Q",
      length: 165,
      plays: 698605451,
      likes: 7900000,
      recency: 2,
    },
    {
      title: "The Monkey Dance",
      url: "https://www.youtube.com/watch?v=qQB-V4r-uMY",
      length: 139,
      plays: 19623952,
      likes: 10000,
      recency: 1,
    },
    {
      title: "I KNOW ?",
      url: "https://www.youtube.com/watch?v=X7aF3nZOS98",
      length: 226,
      plays: 14728895,
      likes: 489000,
      recency: 4,
    },
  ];

  // History == 0, Most Played == 1, Most Liked == 2
  const [currentTab, setCurrentTab] = useState(0);

  function compareByLikes(a, b) {
    return a.likes - b.likes;
  }

  function compareByPlays(a, b) {
    return a.plays - b.plays;
  }

  function compareByRecency(a, b) {
    return a.recency - b.recency;
  }

  return (
    <div className="min-h-screen w-full flex-grow bg-[#262425] flex flex-col items-center text-[#FFFFFF] md:py-[71px] py-8">
      <div className="flex text-center lg:text-5xl md:text-4xl lg:gap-10 gap-2 text-xl w-full max-w-[991px] justify-around py-2 font-extrabold mb-[37px] ">
        <div
          onClick={() => {
            setCurrentTab(0);
          }}
          className={
            currentTab == 0
              ? "hover:cursor-pointer text-[#F6CF00] underline hover:text-yellow-700 hover:no-underline"
              : "hover:cursor-pointer hover:text-[#F6CF00] hover:underline"
          }
        >
          History
        </div>
        <div
          onClick={() => {
            setCurrentTab(1);
          }}
          className={
            currentTab == 1
              ? "hover:cursor-pointer text-[#F6CF00] underline hover:text-yellow-700 hover:no-underline"
              : "hover:cursor-pointer hover:text-[#F6CF00] hover:underline"
          }
        >
          Most Played
        </div>
        <div
          onClick={() => {
            setCurrentTab(2);
          }}
          className={
            currentTab == 2
              ? "hover:cursor-pointer text-[#F6CF00] underline hover:text-yellow-700 hover:no-underline"
              : "hover:cursor-pointer hover:text-[#F6CF00] hover:underline"
          }
        >
          Most Liked
        </div>
      </div>
      <div className="flex flex-col md:items-center md:gap-9 gap-2 relative w-full">
        {currentTab == 0 &&
          videoList
            .sort(compareByRecency)
            .map((vid, index) => 
            <div  key={index} className="flex-col flex items-center xl:gap-9 gap-1 xl:relative max-w-[862px] md:w-full px-3">
              <StatVideoCard video={vid} />
            </div>
            )}
        {currentTab == 1 &&
          videoList
            .sort(compareByPlays)
            .reverse()
            .map((vid, index) => (
              <div
                key={index}
                className="flex-col flex items-center xl:gap-9 gap-1 xl:relative max-w-[862px] md:w-full px-3"
              >
                <StatVideoCard video={vid} />
                <div className="xl:absolute xl:text-2xl xl:-left-[26%] xl:top-9 text-xl font-extrabold">{`Plays: ${vid.plays}`}</div>
              </div>
            ))}
        {currentTab == 2 &&
          videoList
            .sort(compareByLikes)
            .reverse()
            .map((vid, index) => (
              <div
                key={index}
                className="flex-col flex items-center xl:gap-9 gap-1 xl:relative max-w-[862px] md:w-full px-3"
              >
                <StatVideoCard video={vid} />
                <div className="xl:absolute xl:text-2xl xl:-left-[26%] xl:top-9 text-xl font-extrabold">{`Likes: ${vid.likes}`}</div>
              </div>
            ))}
      </div>
    </div>
  );
}
