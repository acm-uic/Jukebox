import React from "react";
import { Link } from "react-router-dom";

export default function MobileDropdown() {
  return (
    <ul className="absolute left-0 top-[96px] bg-gray-400 w-full flex flex-col items-center gap-1 py-1 text-xl font-normal text-gray-300 lg:hidden">
      <li className="hover:text-white hover:underline w-full py-2">
        <Link className="w-full flex justify-center" to="/">
          Home
        </Link>
      </li>
      <div className="border w-full" />
      <li className="hover:text-white hover:underline w-full py-2">
        <Link className="w-full flex justify-center" to="/stats">
          Stats
        </Link>
      </li>
      <div className="border w-full" />
      <li className="hover:text-white hover:underline w-full py-2">
        <Link className="w-full flex justify-center" to="/contributors">
          Contributors
        </Link>
      </li>
    </ul>
  );
}
