import React, { Component } from "react";
import EmptyBoard from "./EmptyBoard";
import Slider from "./Slider";
import Memo from "./Memo";
import Bark from "./Bark";

class Board extends Component {
  state = {};

  renderBoard() {
    let gameChoice = this.props.game;
    if (gameChoice === 1) {
      return <Slider />;
    } else if (gameChoice === 2) {
      return <Memo />;
    } else if (gameChoice === 3) {
      return <Bark />;
    } else {
      return <EmptyBoard gameChoice={this.props.gameChoice} />;
    }
  }

  render() {
    return this.renderBoard();
  }
}

export default Board;
