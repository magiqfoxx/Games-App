import React from "react";

import BarkPiece from "./BarkPiece";

const BarkBoard = props => {
  const renderBoard = () => {
    return props.order.map(element => {
      return (
        <BarkPiece click={props.handleClick} element={element} key={element} />
      );
    });
  };
  return <div className="board__bark">{renderBoard()}</div>;
};

export default BarkBoard;
