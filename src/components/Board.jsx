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
  renderBoard() {
    if (this.props.game === 0) {
      return <EmptyBoard />;
    } else if (this.props.game === 1) {
      return <Slider />;
    } else if (this.props.game === 2) {
      return <Memo />;
    } else if (this.props.game === 3) {
      return <Bark />;
    }
  }
  render() {
    return this.renderBoard();
  }
}

export default Board;
