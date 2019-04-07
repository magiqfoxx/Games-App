import React from "react";
import { connect } from "react-redux";
import {
  startTimer,
  stopTimer,
  resetTimer,
  addPoints,
  resetPoints,
  incrementMovement,
  resetMovement,
  randomizeSlider,
  movePieceSlider
} from "../actions";

import "./Slider.css";

/* Implement a CSS solution for no grid browsers */
//store.getState()
const Slider = props => {
  function calculatePoints() {
    return (2 - props.timeWhenStopped) * 3 + 700;
  }
  function gameIsWon() {
    props.stopTimer();
    props.addPoints(calculatePoints());
    document.querySelector("#message__right").style.display = "block";
    setTimeout(function() {
      document.querySelector("#message__right").style.display = "none";
    }, 3000);
  }
  function movePiece(piece) {
    props.movePieceSlider(props.order, piece);
    if (
      JSON.stringify(props.order) ===
      JSON.stringify([null, 1, 2, 3, 4, 5, 6, 7, 8])
    ) {
      gameIsWon();
    }
  }
  function drawPieces() {
    return props.order.map(piece => {
      // the null piece has to be a png, unlike the rest
      let piecePic;
      if (piece === null) {
        piecePic = "empty.png";
      } else {
        piecePic = piece + ".jpg";
      }
      return (
        <div className="slider--spot" key={piece}>
          <img
            src={`/img/slider/${piecePic}`}
            onClick={() => movePiece(piece)}
            alt={`piece-${piece}`}
          />
        </div>
      );
    });
  }
  function drawBoard() {
    return drawPieces();
  }
  function startGame() {
    document.querySelector("#slider--button").innerHTML = "reset";
    props.randomizeSlider(props.order);
    props.resetTimer();
    props.startTimer();
  }

  return (
    <main>
      <div>
        <button className="button" id="slider--button" onClick={startGame}>
          start
        </button>
      </div>
      <div className="slider--board">
        {drawBoard()}
        <div id="message__right" className="message">
          Good job!
        </div>
      </div>
    </main>
  );
};

const mapStateToProps = state => {
  return {
    time: state.timerReducer,
    timeWhenStopped: state.timeWhenStopped,
    points: state.pointsReducer,
    moves: state.movesReducer,
    order: state.orderSlider
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
    randomizeSlider,
    movePieceSlider
  }
)(Slider);
