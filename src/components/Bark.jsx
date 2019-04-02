import React from "react";
import { connect } from "react-redux";
import {
  randomizeOrderBark,
  addToSeqBark,
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

  function guessSequence(piece, index) {
    //order is based on picture not its' location
    //board gets rendered before state is updated?

    play(piece);
    let guessedSequence = props.guessedSequence;
    guessedSequence.push(index);
    console.log(index, props.guessedSequence);

    if (JSON.stringify(guessedSequence) === JSON.stringify(props.order)) {
      console.log("game is won");
      document.querySelector("#message__right").style.display = "block";
      setTimeout(function() {
        document.querySelector("#message__right").style.display = "none";
        props.upLevel(props.level);
        start();
      }, 3000);
    } else if (
      JSON.stringify(guessedSequence) ===
      JSON.stringify(props.order.slice(0, guessedSequence.length))
    ) {
      //so far so good
      console.log(index);
      props.addToSeqBark(index);
      console.log("current seq ", props.order);
      console.log("seq guessed so far ", props.guessedSequence);
    } else {
      //wrong
      document.querySelector("#message__wrong").style.display = "block";
      setTimeout(function() {
        document.querySelector("#message__wrong").style.display = "none";
        props.resetSeqBark();
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
    console.log(props.level);
    let order = [...Array(props.level + 2).keys()];
    props.randomizeOrderBark(order);
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
    order: state.orderBark,
    guessedSequence: state.guessedSeqBark,
    level: state.level,
    moves: state.moves
  };
};
export default connect(
  mapStateToProps,
  { randomizeOrderBark, addToSeqBark, resetSeqBark, upLevel, zeroLevel }
)(Bark);
