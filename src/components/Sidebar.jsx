import React from "react";

import "./Sidebar.css";

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
