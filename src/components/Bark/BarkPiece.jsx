import React from "react";

const BarkPiece = (props) => {
  return (
    <div className="bark--piece" id={`bark--piece-${props.element}`}>
      <img
        src={`${process.env.PUBLIC_URL}/img/${props.element}.jpg`}
        alt={props.element}
        onClick={() => props.click(props.element)}
      />
    </div>
  );
};

export default BarkPiece;
