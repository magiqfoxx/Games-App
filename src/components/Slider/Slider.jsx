import React, { useState } from "react";
import SliderBoard from "./SliderBoard";
import { shuffle, movePiece, isGameWon } from "./helpers";

const Slider = () => {
  const [pieces, setPieces] = useState([null, 1, 2, 3, 4, 5, 6, 7, 8]);
  const [isGameOn, setIsGameOn] = useState(false);

  const startGame = () => {
    const newSequence = shuffle([null, 1, 2, 3, 4, 5, 6, 7, 8]);
    setPieces(newSequence);
    document.getElementById("slider--button").innerHTML = "Reset";
    setIsGameOn(true);
  };
  const handleMovePiece = piece => {
    if (isGameOn) {
      const newSequence = movePiece(pieces.indexOf(piece), pieces);
      setPieces(newSequence);
      const gameWon = isGameWon(pieces);
      if (gameWon) {
        console.log("you won");
        //redux : setPoints(600);
        setIsGameOn(false);
        document.getElementById("slider--button").innerHTML = "Start";
      }
    }
  };
  return (
    <main className="board">
      <button onClick={startGame} id="slider--button">
        Start
      </button>
      <SliderBoard movePiece={handleMovePiece} pieces={pieces} />
    </main>
  );
};

export default Slider;
