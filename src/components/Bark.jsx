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

const Bark = props => {
  function startTimer() {
    console.log("time");
  }

  function play(piece, index) {
    const audio = new Audio(`/audio/bark/${piece}.mp3`);
    audio.play();
    document
      .querySelector(`#piece-${piece}`)
      .classList.add("playing", `playing-${piece}`);
    setTimeout(() => {
      document
        .querySelector(`#piece-${piece}`)
        .classList.remove("playing", `playing-${piece}`);
    }, 1500);
  }

  function playRound() {
    console.log("round", props.order);
    props.order.map((piece, index) => {
      setTimeout(() => {
        play(piece, index);
      }, 1500 * index);
      document
        .querySelector(`#piece-${piece}`)
        .classList.remove("playing", `playing-${piece}`);
    });
  }
  function gameIsWon() {
    props.stopTimer();
    props.addPoints(100);
    console.log("game is won");
    document.querySelector("#message__right").style.display = "block";
    setTimeout(function() {
      document.querySelector("#message__right").style.display = "none";
      props.resetSeqBark();
      props.upLevel(props.level);
      start();
    }, 3000);
  }
  function guessSequence(piece, index) {
    //there is a mutation of order state between playRound and first click
    props.addMove();
    play(piece);
    let guessedSequence = props.guessedSequence;
    guessedSequence.push(piece);
    console.log(piece, props.guessedSequence);

    if (JSON.stringify(guessedSequence) === JSON.stringify(props.order)) {
      gameIsWon();
    } else if (
      JSON.stringify(guessedSequence) ===
      JSON.stringify(props.order.slice(0, guessedSequence.length))
    ) {
      //so far so good
      console.log(index);
      props.addToSeqBark(piece);
      console.log("current seq ", props.order);
      console.log("seq guessed so far ", props.guessedSequence);
    } else {
      //wrong
      document.querySelector("#message__wrong").style.display = "block";
      setTimeout(function() {
        document.querySelector("#message__wrong").style.display = "none";
        props.resetSeqBark();
        playRound();
      }, 2000);
      console.log("wrong");
    }
  }
  function drawBoard() {
    return props.order.map((piece, index) => {
      return (
        <img
          src={`/img/${piece}.jpg`}
          key={piece}
          onClick={() => guessSequence(piece, index)}
          id={`piece-${piece}`}
          alt={`puppy-${piece}`}
        />
      );
    });
  }
  function start() {
    //props.setNewOrderBark(props.level);
    props.addToOrderBark([0, 1, 2]);
    //props.randomizeOrderBark();
    console.log(props.order);
    document.querySelector("#bark--button").innerHTML = "reset";
    startTimer();
    playRound();
  }

  return (
    <main>
      <div className="bark--nav">
        <button className="button" id="bark--button" onClick={start}>
          start
        </button>
        <span>moves: {props.moves}</span>
      </div>
      <div className="bark--board" id="bark--board">
        {drawBoard()}
        <div id="message__wrong" className="message">
          Wrong
        </div>
        <div id="message__right" className="message">
          Good job!
        </div>
      </div>
    </main>
  );
};

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
