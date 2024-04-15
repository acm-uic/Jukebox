import { useState } from "react";
import MenuDropdown from "./MenuDropdown";
import { Link } from "react-router-dom";

export const Header = () => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <>
      <nav className="fixed z-10 px-4 flex items-center justify-between w-full h-24 font-black bg-neutral-950 text-white">
        <div className="lg:w-1/4 flex gap-2 lg:gap-4">
          <button className="lg:hidden" onClick={() => setShowMenu(!showMenu)}>
            Menu
          </button>
          <ul className="gap-4 min-w-[240px] flex-row bg-transparent text-white py-0 text-base w-auto lg:flex hidden">
            <li className="hover:text-white hover:underline w-full py-2">
              <Link className="w-full flex justify-center" to="/">
                Home
              </Link>
            </li>
            <li className="hover:text-white hover:underline w-full py-2">
              <Link className="w-full flex justify-center" to="/stats">
                Stats
              </Link>
            </li>
            <li className="hover:text-white hover:underline w-full py-2">
              <Link className="w-full flex justify-center" to="/contributors">
                Contributors
              </Link>
            </li>
          </ul>
        </div>
        <h1 className="text-center text-xl md:text-4xl lg:w-1/2">
          ACM@UIC JUKEBOX
        </h1>
        <div className=" flex flex-row-reverse items-center h-full lg:w-1/4">
          <button className="h-1/2 aspect-square">
            <img src="src/images/ProfilePic.png" />
          </button>
        </div>
      </nav>
      <MenuDropdown showMenu={showMenu} setShowMenu={setShowMenu} />
    </>
  );
};
