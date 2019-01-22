import React, { Component } from "react";

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = { game: 0 };
  }
  chooseGame = game => {
    this.props.gameChoice(game);
  };

  render() {
    return (
      <nav id="menu">
        <ul>
          <li
            onClick={() => {
              this.chooseGame(1);
            }}
          >
            Slider
          </li>
          <li
            onClick={() => {
              this.chooseGame(2);
            }}
          >
            Memo
          </li>
          <li
            onClick={() => {
              this.chooseGame(3);
            }}
          >
            Bark
          </li>
        </ul>
      </nav>
    );
  }
}

export default Menu;
