import React, { useEffect } from "react";
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
const Memo = props => {
  /*useEffect(() => {}, []);*/

  function startGame() {
    props.startTimer();
    props.resetPairMemo();

    props.setOrderMemo(props.boardSize);
    props.randomizeMemo(props.order);
  }
  function flipPiece(piece, index) {
    document.getElementById(`piece-back-${index}`).style.display = "none";
    if (Object.keys(props.pair).length === 0) {
      //first flip
      props.setPairMemo({ piece: piece, index: index });
    } else if (props.pair["piece"] === piece) {
      //a pair
      //hide both
      setTimeout(() => {
        document.getElementById(`piece-front-${index}`).style.display = "none";
        document.getElementById(
          `piece-front-${props.pair["index"]}`
        ).style.display = "none";
      }, 1500);
      props.addPoints(100);
      props.resetPairMemo();
    } else {
      //not a pair
      setTimeout(() => {
        document.getElementById(`piece-back-${index}`).style.display = "block";
        document.getElementById(
          `piece-back-${props.pair["index"]}`
        ).style.display = "block";
      }, 1500);
      props.resetPairMemo();
    }
  }
  function drawBoard() {
    //props.setState();
    return props.order.map((piece, index) => {
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
            onClick={() => flipPiece(piece, index)}
            alt={`piece-back-${index}`}
          />
        </div>
      );
    });
  }

  return (
    <main>
      <div className="memo-nav">
        <form id="form" name="board-size">
          <input
            type="radio"
            name="board-size"
            value="12"
            onChange={() => props.setboardSize(6)}
            defaultChecked
          />
          12
          <input
            type="radio"
            name="board-size"
            value="16"
            onChange={() => props.setboardSize(8)}
          />
          16
          <input
            type="radio"
            name="board-size"
            value="20"
            onChange={() => props.setboardSize(10)}
          />
          20
        </form>
        <button
          type="submit"
          className="button"
          id="slider--button"
          onClick={startGame}
        >
          start
        </button>
      </div>
      <div className="board-memo">{drawBoard()}</div>
    </main>
  );
};

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
