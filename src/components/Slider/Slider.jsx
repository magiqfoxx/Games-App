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
  randomizeSlider,
  movePieceSlider
} from "../../actions";

import "./Slider.css";

/* Implement a CSS solution for no grid browsers */
class Slider extends Component {
  state = {};
  timeout;

  componentWillUnmount = () => {
    clearTimeout(this.timeout);
    this.props.stopTimer();
    //this.props.resetTimer();
  };
  startGame = () => {
    document.querySelector("#slider--button").innerHTML = "reset";
    this.props.randomizeSlider(this.props.order);
    //this.props.resetTimer();
    this.props.startTimer();
  };
  calculatePoints = () => {
    return (2 - this.props.timeWhenStopped) * 3 + 700;
  };
  gameIsWon = () => {
    this.props.stopTimer();
    this.props.addPoints(this.calculatePoints());
    document.querySelector("#message__right").style.display = "block";
    this.timeout = setTimeout(function() {
      document.querySelector("#message__right").style.display = "none";
    }, 3000);
  };
  movePiece(piece) {
    this.props.movePieceSlider(this.props.order, piece);
    if (
      JSON.stringify(this.props.order) ===
      JSON.stringify([null, 1, 2, 3, 4, 5, 6, 7, 8])
    ) {
      this.gameIsWon();
    }
  }
  drawPieces = () => {
    return this.props.order.map(piece => {
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
            src={`./img/slider/${piecePic}`}
            onClick={() => this.movePiece(piece)}
            alt={`piece-${piece}`}
          />
        </div>
      );
    });
  };
  drawBoard = () => {
    return this.drawPieces();
  };

  render() {
    return (
      <main>
        <div>
          <button
            className="button"
            id="slider--button"
            onClick={this.startGame}
          >
            start
          </button>
        </div>
        <div className="slider--board">
          {this.drawBoard()}
          <div id="message__right" className="message">
            Good job!
          </div>
        </div>
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
