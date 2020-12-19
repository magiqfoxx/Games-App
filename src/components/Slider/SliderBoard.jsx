import React from "react";
import "../../sass/main.scss";

const SliderBoard = (props) => {
  //Where pieces is an array of pieces in the correct order
  //With null as no piece
  const renderBoard = () => {
    return props.pieces.map((piece) => {
      if (piece) {
        return (
          <img
            src={`${process.env.PUBLIC_URL}/img/slider/${piece}.jpg`}
            className="slider--piece"
            key={piece}
            onClick={() => props.movePiece(piece)}
            alt={piece}
          />
        );
      } else {
        return (
          <img
            src={`${process.env.PUBLIC_URL}/img/slider/empty.png`}
            className="slider--piece"
            key={piece}
            alt="empty space"
          />
        );
      }
    });
  };

  return <div className="board__slider">{renderBoard()}</div>;
};

export default SliderBoard;
