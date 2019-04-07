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
  upLevel,
  resetLevel,
  setNewOrderBark,
  randomizeOrderBark,
  addToOrderBark,
  addToSeqBark,
  resetSeqBark
} from "../actions";

import "./Bark.css";

/* For clarity, 
"order" = sequence that's to be guessed 
"seq" = what's guessed so far */

/* Try this with hooks?
order changes but it plays the same */
class Bark extends Component {
  state = {};
  timeOut;
  componentDidMount = () => {
    this.props.setNewOrderBark(this.props.level);
    this.props.randomizeOrderBark();
  };
  componentWillUnmount = () => {
    clearTimeout(this.timeOut);
    this.props.stopTimer();
    this.props.resetTimer();
    this.props.resetMovement();
    this.props.resetLevel();
  };
  play = (piece, index) => {
    const audio = new Audio(`/audio/bark/${piece}.mp3`);
    audio.play();
    this.timeOut = setTimeout(() => {
      document
        .querySelector(`#piece-${piece}`)
        .classList.remove("playing", `playing-${piece}`);
    }, 1500);
    //to get rid of an error when component is unmounted before timeout finishes
    return document.querySelector(`#piece-${piece}`)
      ? document
          .querySelector(`#piece-${piece}`)
          .classList.add("playing", `playing-${piece}`)
      : null;
  };

  playRound = () => {
    console.log("round", this.props.order);
    this.props.order.map((piece, index) => {
      this.timeOut = setTimeout(() => {
        this.play(piece, index);
      }, 1500 * index);
      document
        .querySelector(`#piece-${piece}`)
        .classList.remove("playing", `playing-${piece}`);
    });
  };
  gameIsWon = () => {
    this.props.stopTimer();
    this.props.addPoints(100);
    console.log("game is won");
    document.querySelector("#message__right").style.display = "block";
    this.timeOut = setTimeout(() => {
      document.querySelector("#message__right").style.display = "none";
      this.props.resetSeqBark();
      this.props.upLevel(this.props.level);
      this.start();
    }, 3000);
  };
  guessSequence = (piece, index) => {
    //there is a mutation of order state between playRound and first click
    this.props.incrementMovement();
    this.play(piece);
    let guessedSequence = this.props.guessedSequence;
    guessedSequence.push(piece);
    console.log(piece, this.props.guessedSequence);

    if (JSON.stringify(guessedSequence) === JSON.stringify(this.props.order)) {
      this.gameIsWon();
    } else if (
      JSON.stringify(guessedSequence) ===
      JSON.stringify(this.props.order.slice(0, guessedSequence.length))
    ) {
      //so far so good
      console.log(index);
      this.props.addToSeqBark(piece);
      console.log("current seq ", this.props.order);
      console.log("seq guessed so far ", this.props.guessedSequence);
    } else {
      //wrong
      document.querySelector("#message__wrong").style.display = "block";
      this.timeOut = setTimeout(() => {
        document.querySelector("#message__wrong").style.display = "none";
        this.props.resetSeqBark();
        this.playRound();
      }, 2000);
      console.log("wrong");
    }
  };
  drawBoard = () => {
    return this.props.order.map((piece, index) => {
      return (
        <img
          src={`/img/${piece}.jpg`}
          key={piece}
          onClick={() => this.guessSequence(piece, index)}
          id={`piece-${piece}`}
          alt={`puppy-${piece}`}
        />
      );
    });
  };
  start = () => {
    this.props.startTimer();

    console.log(this.props.order);
    document.querySelector("#bark--button").innerHTML = "reset";
    this.playRound();
  };
  render() {
    return (
      <main>
        <div className="bark--nav">
          <button className="button" id="bark--button" onClick={this.start}>
            start
          </button>
          <span>moves: {this.props.moves}</span>
        </div>
        <div className="bark--board" id="bark--board">
          {this.drawBoard()}
          <div id="message__wrong" className="message">
            Wrong
          </div>
          <div id="message__right" className="message">
            Good job!
          </div>
        </div>
      </main>
    );
  }
}

const mapStateToProps = state => {
  console.log(state);
  return {
    time: state.time,
    points: state.pointsReducer,
    moves: state.movesReducer,
    level: state.level,
    order: state.orderBark,
    guessedSequence: state.guessedSeqBark
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
    upLevel,
    resetLevel,
    setNewOrderBark,
    randomizeOrderBark,
    addToOrderBark,
    addToSeqBark,
    resetSeqBark
  }
)(Bark);
