import { useState } from "react";
import { Link } from "react-router-dom";
import MobileDropdown from "./components/MobileDropdown";
import WebDropdown from "./components/WebDropdown";

export const Header = () => {
  const [menu, setMenu] = useState(false);

  function handleClick() {
    setMenu(!menu);
  }
  
  return (
    <nav className="fixed z-50 px-4 flex items-center justify-between w-full h-24 font-black bg-neutral-900 text-white">
      <div className='lg:w-1/4'>
        <button className='lg:hidden' onClick={handleClick}>Menu</button>
        <div className="lg:inline-block hidden w-full">
            <WebDropdown />
        </div>
        {menu && (
          <MobileDropdown />
        )}
      </div>
      <h1 className="text-center text-xl md:text-4xl lg:w-1/2"> ACM@UIC JUKEBOX </h1>
      <div className=" flex flex-row-reverse items-center h-full lg:w-1/4">
        <button className="h-1/2 aspect-square">
          <img src="src/images/ProfilePic.png" />
        </button>
      </div>
    </nav>
  );
};
