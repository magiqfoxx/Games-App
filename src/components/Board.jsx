import React, { Component } from "react";
import EmptyBoard from "./EmptyBoard";
import Slider from "./Slider";
import Memo from "./Memo";
import Bark from "./Bark";

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  gameIsStarted = () => {
    this.props.gameIsStarted(true);
  };

  renderBoard() {
    if (this.props.game === 0) {
      return <EmptyBoard gameChoice={this.props.gameChoice} />;
    } else if (this.props.game === 1) {
      return <Slider gameIsStarted={this.gameIsStarted} />;
    } else if (this.props.game === 2) {
      return <Memo gameIsStarted={this.gameIsStarted} />;
    } else if (this.props.game === 3) {
      return <Bark gameIsStarted={this.gameIsStarted} />;
    }
  }
  render() {
    return this.renderBoard();
  }
}

export default Board;
