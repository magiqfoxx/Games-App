import React from "react";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/slider">Slider</Link>
        </li>
        <li>
          <Link to="/memo">Memo</Link>
        </li>
        <li>
          <Link to="/bark">Bark</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
