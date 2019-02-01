import React, { Component } from "react";

class GameWon extends Component {
  state = {};
  render() {
    return (
      <div
        className="board--message__won"
        onClick={() => {
          this.props.handleClose();
        }}
      >
        <div id="you-won">
          Congratulations! You won in {this.props.timeWhenWon}
        </div>
      </div>
    );
  }
}

export default GameWon;
