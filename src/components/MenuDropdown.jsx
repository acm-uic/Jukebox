import React from "react";
import { Link } from "react-router-dom";

export default function MenuDropdown() {
  return (
    <ul className="lg:gap-4 lg:min-w-[240px] lg:static lg:flex-row lg:bg-transparent lg:text-white lg:py-0 lg:text-base lg:w-auto absolute left-0 top-[96px] bg-gray-400 w-full flex flex-col items-center gap-1 py-1 text-xl text-gray-300">
      <li className="hover:text-white hover:underline w-full py-2">
        <Link className="w-full flex justify-center" to="/">
          Home
        </Link>
      </li>
      <div className="border w-full lg:hidden" />
      <li className="hover:text-white hover:underline w-full py-2">
        <Link className="w-full flex justify-center" to="/stats">
          Stats
        </Link>
      </li>
      <div className="border w-full lg:hidden" />
      <li className="hover:text-white hover:underline w-full py-2">
        <Link className="w-full flex justify-center" to="/contributors">
          Contributors
        </Link>
      </li>
    </ul>
  );
}
