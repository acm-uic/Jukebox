import { useEffect, useState } from "react";
import StatVideoCard from "../components/StatsPageComponents/StatVideoCard";
import StatsHeader from "../components/StatsPageComponents/StatsHeader";

export default function StatsPage() {
  const [storage, setStorage] = useState([]);

  useEffect(() => {
    //fetch storage
    async function fetchStorage() {
      const response = await fetch(
        import.meta.env.VITE_APP_BACKEND_URL + "/songs/storage"
      );
      const storageData = await response.json();

      if (!response.ok) {
        console.error("Failed to fetch storage");
        return;
      }

      setStorage(storageData);
    }

    fetchStorage();
  }, []);
  //using plays as int, likes as int,
  const videoList = [
    {
      title: "5 second timer",
      url: "https://youtu.be/GM_3IlttE-I?si=diSmC-rKBVyPCL4y",
      duration: 5,
      plays: 0,
      likes: 0,
    },
    {
      title: "Do I Wanna Know?hbjhbiuhnuinuhijdklaskdlsadjlaks",
      url: "https://www.youtube.com/watch?v=bpOSxM0rNPM",
      duration: 365,
      plays: 1627943000,
      likes: 9600000,
    },
    {
      title: "As It Was",
      url: "https://www.youtube.com/watch?v=H5v3kku4y6Q",
      duration: 165,
      plays: 698605451,
      likes: 7900000,
    },
    {
      title: "The Monkey Dance",
      url: "https://www.youtube.com/watch?v=qQB-V4r-uMY",
      duration: 139,
      plays: 19623952,
      likes: 10000,
    },
    {
      title: "I KNOW ?",
      url: "https://www.youtube.com/watch?v=X7aF3nZOS98",
      duration: 226,
      plays: 14728895,
      likes: 489000,
    },
  ];

  // History == 0, Most Played == 1, Most Liked == 2
  const [currentTab, setCurrentTab] = useState(0);

  return (
    <div className="min-h-screen w-full flex-grow bg-[#262425] flex flex-col items-center text-[#FFFFFF] md:py-[71px] py-8">
      <StatsHeader currentTab={currentTab} setCurrentTab={setCurrentTab} />
      <div className="flex flex-col md:items-center md:gap-9 gap-2 relative w-full">
        {currentTab == 0 &&
          storage
            .sort((a, b) => {
              const timeA = Date.parse(a.lastPlayed);
              const timeb = Date.parse(b.lastPlayed);

              return timeb - timeA;
            })
            .map((vid, index) => (
              <div
                key={index}
                className="flex-col flex items-center xl:gap-9 gap-1 xl:relative max-w-[862px] md:w-full px-3"
              >
                <StatVideoCard video={vid} />
              </div>
            ))}
        {currentTab == 1 &&
          storage
            .sort((a, b) => b.plays - a.plays)
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
          storage
            .sort((a, b) => b.likes - a.likes)
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
