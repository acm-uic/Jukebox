import React from "react";
import { Link } from "react-router-dom";

export default function WebDropdown() {
  return (
    <ul className="flex gap-4 min-w-[240px]">
      <li>
        <Link
          onClick={() => {
            setMenu(false);
          }}
          to="/"
        >
          Home
        </Link>
      </li>
      <li>
        <Link
          onClick={() => {
            setMenu(false);
          }}
          to="/stats"
        >
          Stats
        </Link>
      </li>
      <li>
        <Link
          onClick={() => {
            setMenu(false);
          }}
          to="/contributors"
        >
          Contributors
        </Link>
      </li>
    </ul>
  );
}
