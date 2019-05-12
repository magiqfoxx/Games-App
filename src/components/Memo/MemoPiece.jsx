import React from "react";

const MemoPiece = props => {
  const renderPiece = () => {
    return (
      <React.Fragment>
        <img
          src={`../img/${props.piece}.jpg`}
          className="memo--piece__front"
          alt="dog"
        />

        <img
          src={`../img/back.jpg`}
          className="memo--piece__back"
          alt="back"
          onClick={() => props.onFlip(props.piece, props.spot)}
        />
      </React.Fragment>
    );
  };
  return (
    <div className="memo--piece" id={`memo--spot-${props.spot}`}>
      {renderPiece()}
    </div>
  );
};

export default MemoPiece;
