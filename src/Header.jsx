import { useState } from "react";
import { Link } from "react-router-dom";

export const Header = () => {
  const [menu, setMenu] = useState(false);

  function handleClick() {
    setMenu(!menu);
  }

  return (
    <nav className="fixed z-50 px-4 flex flex-row items-center justify-between w-full h-24 font-black bg-neutral-900 text-white">
      <div>
        <button onClick={handleClick}>Menu</button>
        {menu && (
          <ul className="absolute left-0 top-[96px] bg-gray-400 w-full flex flex-col items-center gap-1 py-1 text-xl font-normal text-gray-300">
            <li className="hover:text-white hover:underline w-full py-2">
              <Link
                onClick={() => {
                  setMenu(false);
                }}
                className="w-full flex justify-center"
                to="/"
              >
                Home
              </Link>
            </li>
            <div className="border w-full" />
            <li className="hover:text-white hover:underline w-full py-2">
              <Link
                onClick={() => {
                  setMenu(false);
                }}
                className="w-full flex justify-center"
                to="/stats"
              >
                Stats
              </Link>
            </li>
            <div className="border w-full" />
            <li className="hover:text-white hover:underline w-full py-2">
              <Link
                onClick={() => {
                  setMenu(false);
                }}
                className="w-full flex justify-center"
                to="/contributors"
              >
                Contributors
              </Link>
            </li>
          </ul>
        )}
      </div>
      <h1 className="text-center text-xl md:text-4xl"> ACM@UIC JUKEBOX </h1>
      <div className="flex flex-row-reverse items-center h-full">
        <button className="h-1/2 aspect-square">
          <img src="src/images/ProfilePic.png" />
        </button>
      </div>
    </nav>
  );
};
