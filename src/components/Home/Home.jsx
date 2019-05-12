import React from "react";
import { Link } from "react-router-dom";

import "./Home.css";

const Home = () => {
  return (
    <main className="board" id="board__empty">
      <h1>Welcome. Please choose your game.</h1>
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
    </main>
  );
};

export default Home;
