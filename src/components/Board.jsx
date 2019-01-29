import React, { Component } from "react";
import EmptyBoard from "./EmptyBoard";
import Slider from "./Slider";
import Memo from "./Memo";
import Bark from "./Bark";

class Board extends Component {
  state = {};

  gameIsStarted = () => {
    this.props.gameIsStarted(true);
  };
  gameIsWon = () => {
    this.props.gameIsWon(true);
  };
  emptyBoard = <EmptyBoard gameChoice={this.props.gameChoice} />;
  slider = (
    <Slider gameIsStarted={this.gameIsStarted} gameIsWon={this.gameIsWon} />
  );
  bark = <Bark gameIsStarted={this.gameIsStarted} />;

  memo = (
    <Memo
      startGame={this.props.gameIsStarted}
      gameIsStarted={this.gameIsStarted}
      gameIsWon={this.gameIsWon}
    />
  );

  renderBoard() {
    let gameChoice = this.props.game;
    switch (gameChoice) {
      case 0:
        return this.emptyBoard;
      case 1:
        return this.slider;
      case 2:
        return this.memo;
      case 3:
        return this.bark;
      default:
        return this.emptyBoard;
    }
  }

  render() {
    return this.renderBoard();
  }
}

export default Board;
