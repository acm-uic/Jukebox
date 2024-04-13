import { useState } from "react";
import MenuDropdown from "./MenuDropdown";

export const Header = () => {
  const [menu, setMenu] = useState(false);

  function handleClick() {
    setMenu(!menu);
  }

  return (
    <nav className="fixed z-50 px-4 flex items-center justify-between w-full h-24 font-black bg-neutral-950 text-white">
      <div className="lg:w-1/4 flex gap-2 lg:gap-4">
        <button onClick={handleClick}>Menu</button>
        {menu && <MenuDropdown />}
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
  );
};
