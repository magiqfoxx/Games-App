import React, { useState } from "react";
import {
  shuffle,
  checkIfGameWon,
  playBark,
  addClassPlaying,
  removeClassPlaying
} from "./helpers";
import BarkBoard from "./BarkBoard";
import WinningMessage from "../WinningMessage";

import Timer from "../Timer/Timer";
import { connect } from "react-redux";
import { startTimer, stopTimer, addPoints } from "../../actions";

//hard with no colors? and no scale
//mid no colors?
const Bark = props => {
  //order is what you're guessing
  //sequence is what you've guessed so far
  const [board, setBoard] = useState([0, 1, 2]);
  const [order, setOrder] = useState([0, 1, 2]);
  const [sequence, setSequence] = useState([]);
  const [isGameOn, setIsGameOn] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isGameWon, setIsGameWon] = useState(false);
  const [timeWhenStopped, setTimeWhenStopped] = useState(0);
  const [moves, setMoves] = useState(0);

  const reset = () => {
    props.stopTimer();
    setMoves(0);
    setIsGameWon(false);
  };
  const startGame = () => {
    reset();

    const newOrder = shuffle([0, 1, 2]);
    setOrder(newOrder);
    document.getElementById("bark--button").innerHTML = "Reset";
    setIsGameOn(true);
    //state update is delayed
    playOrder(newOrder);
    props.startTimer();
  };
  const nextRound = () => {
    if (checkIfGameWon(order)) {
      setIsGameWon(true);
      props.addPoints(700);
      setIsGameOn(false);
      props.stopTimer();
      document.getElementById("bark--button").innerHTML = "Start";
    } else {
      //add next element to the order
      const newBoard = [...board, board.length];
      setBoard(newBoard);
      const newOrder = shuffle(newBoard);
      setOrder(newOrder);
      setTimeout(() => {
        playOrder(newOrder);
      }, 1000);
    }
  };
  const playElement = (element, index = 0) => {
    //play audio
    setTimeout(() => {
      playBark(element);
      addClassPlaying(element);
    }, 1500 * index);
    setTimeout(() => {
      removeClassPlaying(element);
      //remove the isPlaying label on last piece in order to make pieces clickable again
      if (index === order.length - 1) {
        setIsPlaying(false);
      }
    }, 1000 + 1500 * index);
  };
  const playOrder = order => {
    setIsPlaying(true);
    return order.forEach((element, index) => {
      playElement(element, index);
    });
  };
  const handleClick = piece => {
    setMoves(moves + 1);
    //piece is the picture/sound
    if (isGameOn && !isPlaying) {
      playElement(piece);
      if (piece === order[sequence.length]) {
        //correct
        setSequence([...sequence, piece]);
        //state update is delayed
        if (JSON.stringify([...sequence, piece]) == JSON.stringify(order)) {
          props.addPoints(100);
          nextRound();
        }
      } else {
        //wrong guess
        setSequence([]);
        playOrder(order);
      }
    }
  };
  const handleGettingTWS = time => {
    setTimeWhenStopped(time);
  };
  const closeMessage = () => {
    setIsGameWon(false);
  };
  return (
    <main className="board">
      <div id="game--info">
        <Timer getTWS={handleGettingTWS} />
        <span id="memo--points">{props.points}pts</span>
        <span id="memo--points">{moves} moves</span>
      </div>

      <button onClick={startGame} id="bark--button">
        Start
      </button>
      <BarkBoard order={board} handleClick={handleClick} />

      {isGameWon ? (
        <WinningMessage
          timeWhenStopped={timeWhenStopped}
          handleClose={closeMessage}
        />
      ) : null}
    </main>
  );
};

const mapStateToProps = state => {
  return {
    time: state.time,
    timeWhenStopped: state.timeWhenStopped,
    points: state.points
  };
};
export default connect(
  mapStateToProps,
  {
    startTimer,
    stopTimer,
    addPoints
  }
)(Bark);
