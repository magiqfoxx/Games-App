import React, { useState } from "react";
import {
  shuffle,
  isGameWon,
  playElement,
  addClassPlaying,
  removeClassPlaying
} from "./helpers";

import BarkBoard from "./BarkBoard";

//hard with no colors? and no scale
//mid no colors?
const Bark = () => {
  //order is what you're guessing
  //sequence is what you've guessed so far

  const [order, setOrder] = useState([0, 1, 2]);
  const [sequence, setSequence] = useState([]);
  const [isGameOn, setIsGameOn] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const startGame = () => {
    const newOrder = shuffle([0, 1, 2]);
    setOrder(newOrder);
    document.getElementById("bark--button").innerHTML = "Reset";
    setIsGameOn(true);
    playOrder(order);
  };
  const nextRound = () => {
    if (isGameWon(order)) {
      console.log("you won");
      //redux : add redux Points(600);
      setIsGameOn(false);
      document.getElementById("bark--button").innerHTML = "Start";
    } else {
      //add next element to the order
      const newOrder = shuffle([order, order[order.length - 1] + 1]);
      setOrder(newOrder);
    }
  };
  const playOrder = order => {
    setIsPlaying(true);
    return order.map((element, index) => {
      //play audio
      setTimeout(() => {
        playElement(element);
        addClassPlaying(element);
      }, 1500 * index);
      setTimeout(() => {
        removeClassPlaying(element);
        //remove the isPlaying label on last piece in order to make pieces clickable again
        if (index === order.length - 1) {
          setIsPlaying(false);
        }
      }, 1000 + 1500 * index);
    });
  };
  const handleClick = piece => {
    //piece is the picture/sound
    if (isGameOn && !isPlaying) {
      if (piece === order[sequence.length]) {
        //correct
        //add piece to guessed sequence
        setSequence([sequence, piece]);
        if (JSON.stringify(sequence) == JSON.stringify(order)) {
          //round is won
          console.log("round won");
          //add redux points
          nextRound();
        }
      } else {
        //wrong guess
        //reset guessed sequence
        setSequence([]);
        playOrder(order);
      }
    }
  };

  return (
    <main className="board">
      <button onClick={startGame} id="bark--button">
        Start
      </button>
      <BarkBoard order={order} handleClick={handleClick} />
    </main>
  );
};

export default Bark;
