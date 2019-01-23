import React, { Component } from "react";

class EmptyBoard extends Component {
  state = {};
  chooseGame = game => {
    this.props.gameChoice(game);
  };
  render() {
    return (
      <div className="board" id="board__empty">
        <h1>Welcome. Please choose your game.</h1>
        <ol>
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
        </ol>
      </div>
    );
  }
}

export default EmptyBoard;
