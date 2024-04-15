export default function StatsHeader({ currentTab, setCurrentTab }) {
  return (
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
  );
}
