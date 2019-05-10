import React from "react";

import "./Sidebar.css";
//put other options for picture/'collected' dogs and authors of pictures
const Sidebar = () => {
  return (
    <div id="sidebar" className="hidden">
      <button
        className="sidebar--button"
        onClick={() => {
          document.getElementById("sidebar").classList.toggle("hidden");
        }}
      >
        >>
      </button>
    </div>
  );
};

export default Sidebar;
