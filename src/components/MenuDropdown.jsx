import { Link } from "react-router-dom";

export default function MenuDropdown({ showMenu, setShowMenu }) {
  return (
    <ul
      className={`lg:hidden z-[5] fixed left-0 duration-100 - ${
        showMenu ? "top-[96px]" : "top-[-10%]"
      } bg-gray-400 w-full flex flex-col items-center gap-1 py-1 text-xl text-gray-300`}
    >
      <li
        className="hover:text-white hover:underline w-full py-2"
        onClick={() => setShowMenu(false)}
      >
        <Link className="w-full flex justify-center" to="/">
          Home
        </Link>
      </li>
      <div className="border w-full" />
      <li
        className="hover:text-white hover:underline w-full py-2"
        onClick={() => setShowMenu(false)}
      >
        <Link className="w-full flex justify-center" to="/stats">
          Stats
        </Link>
      </li>
      <div className="border w-full" />
      <li
        className="hover:text-white hover:underline w-full py-2"
        onClick={() => setShowMenu(false)}
      >
        <Link className="w-full flex justify-center" to="/contributors">
          Contributors
        </Link>
      </li>
    </ul>
  );
}
