import React, { Component } from "react";
import { connect } from "react-redux";
import {
  startTimer,
  stopTimer,
  resetTimer,
  addPoints,
  resetPoints,
  incrementMovement,
  resetMovement,
  setboardSize,
  setOrderMemo,
  randomizeMemo,
  setPairMemo,
  resetPairMemo
} from "../actions";

import "./Memo.css";

class Memo extends Component {
  state = {};
  timeout;

  componentWillUnmount = () => {
    this.props.stopTimer();
    this.props.resetTimer();
    clearTimeout(this.timeout);
  };
  startGame = () => {
    this.props.startTimer();
    this.props.setOrderMemo(this.props.boardSize);
    this.props.randomizeMemo(this.props.order);

    this.props.resetMovement();
    this.props.resetPairMemo();
  };

  flipPiece = (piece, index) => {
    document.getElementById(`piece-back-${index}`).style.display = "none";
    if (Object.keys(this.props.pair).length === 0) {
      //first flip
      this.props.setPairMemo({ piece: piece, index: index });
    } else if (this.props.pair["piece"] === piece) {
      //a pair
      //hide both
      this.timeout = setTimeout(() => {
        document.getElementById(`piece-front-${index}`).style.display = "none";
        document.getElementById(
          `piece-front-${this.props.pair["index"]}`
        ).style.display = "none";
      }, 1500);

      this.props.addPoints(100);
      this.props.resetPairMemo();
    } else {
      //not a pair
      setTimeout(() => {
        document.getElementById(`piece-back-${index}`).style.display = "block";
        document.getElementById(
          `piece-back-${this.props.pair["index"]}`
        ).style.display = "block";
      }, 1500);
      this.props.resetPairMemo();
    }
  };
  drawBoard = () => {
    //this.props.setState();
    return this.props.order.map((piece, index) => {
      return (
        <div className="piece" key={index}>
          <img
            src={`/img/${piece}.jpg`}
            className="piece-front"
            id={`piece-front-${index}`}
            alt={`piece-front-${index}`}
          />
          <img
            src={`/img/back.jpg`}
            className="piece-back"
            id={`piece-back-${index}`}
            onClick={() => this.flipPiece(piece, index)}
            alt={`piece-back-${index}`}
          />
        </div>
      );
    });
  };

  render() {
    return (
      <main>
        <div className="memo-nav">
          <form id="form" name="board-size">
            <input
              type="radio"
              name="board-size"
              value="12"
              onChange={() => this.props.setboardSize(6)}
              defaultChecked
            />
            12
            <input
              type="radio"
              name="board-size"
              value="16"
              onChange={() => this.props.setboardSize(8)}
            />
            16
            <input
              type="radio"
              name="board-size"
              value="20"
              onChange={() => this.props.setboardSize(10)}
            />
            20
          </form>
          <button
            type="submit"
            className="button"
            id="slider--button"
            onClick={this.startGame}
          >
            start
          </button>
        </div>
        <div className="board-memo">{this.drawBoard()}</div>
      </main>
    );
  }
}

const mapStateToProps = state => {
  return {
    time: state.timerReducer,
    timeWhenStopped: state.timeWhenStopped,
    points: state.pointsReducer,
    moves: state.movesReducer,
    boardSize: state.boardSizeMemo,
    order: state.orderMemo,
    pair: state.pairMemo
  };
};
export default connect(
  mapStateToProps,
  {
    startTimer,
    stopTimer,
    resetTimer,
    addPoints,
    resetPoints,
    incrementMovement,
    resetMovement,
    setboardSize,
    setOrderMemo,
    randomizeMemo,
    setPairMemo,
    resetPairMemo
  }
)(Memo);
