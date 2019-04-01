import React from "react";
import { connect } from "react-redux";
import {
  randomizeBark,
  setNewSeqBark,
  resetSeqBark,
  upLevel,
  zeroLevel
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
    props.order.map((piece, index) => {
      setTimeout(() => {
        play(piece, index);
      }, 1500 * index);
      document
        .querySelector(`#piece-${piece}`)
        .classList.remove("playing", `playing-${piece}`);
    });
  }
  function guessSequence(piece) {
    play(piece);
    let guess = props.guessedSequence;
    guess.push(piece);
    if (JSON.stringify(guess) === JSON.stringify(props.order)) {
      console.log("game is won");
      props.upLevel(props.level);
      start();
    } else if (
      JSON.stringify(guess) ===
      JSON.stringify(props.order.slice(0, guess.length))
    ) {
      //so far so good
      props.setNewSeqBark(guess);
      console.log("current seq ", props.order);
      console.log("seq guessed so far ", props.guessedSequence);
    } else {
      //wrong
      console.log("wrong");
      props.resetSeqBark();
    }
  }
  function drawBoard() {
    return props.order.map(piece => {
      return (
        <img
          src={`/img/${piece}.jpg`}
          key={piece}
          onClick={() => guessSequence(piece)}
          id={`piece-${piece}`}
          alt={`puppy-${piece}`}
        />
      );
    });
  }
  function start() {
    let level = props.level;
    let order = [...Array(level + 2).keys()];
    console.log(order);
    props.randomizeBark(order);
    drawBoard();
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
      </div>
      <div className="bark--board">{drawBoard()}</div>
    </main>
  );
};

const mapStateToProps = state => {
  console.log(state);
  return {
    order: state.orderBark,
    guessedSequence: state.guessedSeqBark,
    level: state.level,
    moves: state.moves
  };
};
export default connect(
  mapStateToProps,
  { randomizeBark, setNewSeqBark, resetSeqBark, upLevel, zeroLevel }
)(Bark);
