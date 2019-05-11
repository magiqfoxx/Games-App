import React, { useState } from "react";

import MemoBoard from "./MemoBoard";
import { getSequence, isGameWon } from "./helpers.js";

const Memo = () => {
  //piece is the image
  //spot is the location on the board

  const [pieces, setPieces] = useState([]);
  const [flipped, setFlipped] = useState({});

  const startGame = () => {
    const newSequence = getSequence([0, 1, 2, 3, 4, 5, 6, 7, 8]);
    console.log(newSequence);
    setPieces(newSequence);
    document.getElementById("memo--button").innerHTML = "Reset";
  };
  const handleFlipping = (piece, spot) => {
    console.log(pieces, flipped);
    if (
      Object.entries(flipped).length === 0 &&
      flipped.constructor === Object
    ) {
      //first piece
      setFlipped({ spot, piece });
    } else {
      if (piece === flipped.piece) {
        //pair
        //disappear both
        document
          .querySelector(`#memo--spot-${spot}`)
          .classList.add("disappear");
        document
          .querySelector(`#memo--spot-${flipped.spot}`)
          .classList.add("disappear");

        //add redux points
      } else {
        //no pair
        //flip back
        console.log(piece, spot, flipped);
        const flipTimeout = setTimeout(() => {
          document
            .querySelector(`#memo--spot-${spot}`)
            .classList.remove("flip");
          document
            .querySelector(`#memo--spot-${flipped.spot}`)
            .classList.remove("flip");
        }, 2000);
      }
      //set flipped to {} for next guess
      setFlipped({});

      if (isGameWon(pieces)) {
        console.log("you won");
        //redux : add Points(600);
        document.getElementById("memo--button").innerHTML = "Start";
      }
    }
  };

  return (
    <main className="board">
      <button onClick={startGame} id="memo--button">
        Start
      </button>
      <MemoBoard pieces={pieces} flipPiece={handleFlipping} />
    </main>
  );
};

export default Memo;
