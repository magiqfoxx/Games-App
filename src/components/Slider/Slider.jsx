import React, { useState } from "react";

import WinningMessage from "../WinningMessage";
import SliderBoard from "./SliderBoard";
import { shuffle, movePiece, checkIfGameWon } from "./helpers";

import Timer from "../Timer/Timer";
import { connect } from "react-redux";
import { startTimer, stopTimer, addPoints } from "../../actions";

const Slider = props => {
  const [sequence, setSequence] = useState([null, 1, 2, 3, 4, 5, 6, 7, 8]);
  const [isGameOn, setIsGameOn] = useState(false);
  const [timeWhenStopped, setTimeWhenStopped] = useState(0);
  const [moves, setMoves] = useState(0);
  const [isGameWon, setIsGameWon] = useState(false);

  const reset = () => {
    setIsGameWon(false);
    props.stopTimer();
    setMoves(0);
  };
  const startGame = () => {
    reset();
    props.startTimer();
    setIsGameOn(true);

    const newSequence = shuffle([null, 1, 2, 3, 4, 5, 6, 7, 8]);
    setSequence(newSequence);
    document.getElementById("slider--button").innerHTML = "Reset";
  };
  const handleMovePiece = piece => {
    setMoves(moves + 1);
    if (isGameOn) {
      const newSequence = movePiece(sequence.indexOf(piece), sequence);
      setSequence(newSequence);
      if (checkIfGameWon(newSequence)) {
        props.addPoints(600);
        props.stopTimer();
        setMoves(0);
        setIsGameOn(false);
        setIsGameWon(true);
        document.getElementById("slider--button").innerHTML = "Start";
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
      <button onClick={startGame} id="slider--button">
        Start
      </button>
      <SliderBoard movePiece={handleMovePiece} pieces={sequence} />
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
)(Slider);
