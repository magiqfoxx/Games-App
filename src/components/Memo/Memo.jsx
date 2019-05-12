import React, { useState } from "react";

import MemoBoard from "./MemoBoard";
import { getSequence } from "./helpers.js";
import WinningMessage from "../WinningMessage";

import Timer from "../Timer/Timer";
import { connect } from "react-redux";
import { startTimer, stopTimer, addPoints } from "../../actions";

//stopping timer works only by button :(

const Memo = props => {
  //piece is the image
  //spot is the location on the board

  const [pieces, setPieces] = useState([]);
  const [flipped, setFlipped] = useState({});
  const [pairsLeft, setPairsLeft] = useState(9);
  const [timeWhenStopped, setTimeWhenStopped] = useState(0);
  const [moves, setMoves] = useState(0);
  const [isGameWon, setIsGameWon] = useState(false);

  const startGame = () => {
    props.stopTimer();
    setMoves(0);

    const newSequence = getSequence([0, 1, 2, 3, 4, 5, 6, 7, 8]);
    setPieces(newSequence);
    document.getElementById("memo--button").innerHTML = "Reset";
    props.startTimer();
  };
  const handleFlipping = (piece, spot) => {
    setMoves(moves + 1);
    if (
      Object.entries(flipped).length === 0 &&
      flipped.constructor === Object
    ) {
      //first piece
      setFlipped({ spot, piece });
    } else {
      if (piece === flipped.piece) {
        //pair
        document
          .querySelector(`#memo--spot-${spot}`)
          .classList.add("disappear");
        document
          .querySelector(`#memo--spot-${flipped.spot}`)
          .classList.add("disappear");
        setPairsLeft(pairsLeft - 1);
        props.addPoints(50);
      } else {
        //no pair
        setTimeout(() => {
          try {
            document
              .querySelector(`#memo--spot-${spot}`)
              .classList.remove("flip");
            document
              .querySelector(`#memo--spot-${flipped.spot}`)
              .classList.remove("flip");
          } catch (error) {
            console.log(error);
          }
        }, 2000);
      }
      //set flipped to {} for next guess
      setFlipped({});
      //pairLeft is delayed
      if (pairsLeft === 1) {
        setIsGameWon(true);
        props.stopTimer();
        setMoves(0);
        props.addPoints(200);
        //redux : add Points(600);
        document.getElementById("memo--button").innerHTML = "Start";
        document.getElementById("memo--time").innerHTML = timeWhenStopped;

        const message = document.getElementById("message");
        message.innerHTML = message.style("display:block");
      }
    }
  };
  const handleGettingTWS = time => {
    setTimeWhenStopped(time);
  };
  return (
    <main className="board">
      <div>
        <span id="memo--points">{props.points}pts</span>
        <span id="memo--points">{moves} moves</span>
        <h2 id="memo--time" />
      </div>

      <button onClick={startGame} id="memo--button">
        Start
      </button>
      <button onClick={props.stopTimer} id="memo--button">
        Start
      </button>
      <MemoBoard pieces={pieces} flipPiece={handleFlipping} />
      <Timer getTWS={handleGettingTWS} />
      {isGameWon ? <WinningMessage timeWhenStopped={timeWhenStopped} /> : null}
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
)(Memo);
