import React, { Component } from "react";

class NavBar extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <div id="navBar" className="hidden">
          <button
            className="navBar--button"
            onClick={() => {
              document.getElementById("navBar").classList.toggle("hidden");
            }}
          >
            >>
          </button>
        </div>
      </React.Fragment>
    );
  }
}

export default NavBar;
