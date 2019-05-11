import React from "react";

import MemoPiece from "./MemoPiece";

const MemoBoard = props => {
  const handleFlip = (piece, spot) => {
    document.querySelector(`#memo--spot-${spot}`).classList.add("flip");
    props.flipPiece(piece, spot);
  };
  const renderBoard = () => {
    return props.pieces.map((piece, index) => {
      //I'm using index as key since MemoPieces should not be changing their place
      return (
        <MemoPiece piece={piece} spot={index} key={index} onFlip={handleFlip} />
      );
    });
  };
  return <div className="board__memo">{renderBoard()}</div>;
};

export default MemoBoard;
