import React from "react";

const WinningMessage = props => {
  return (
    <div
      id="message"
      onClick={() => {
        props.handleClose();
      }}
    >
      <h1>You won in {props.timeWhenStopped} !</h1>
    </div>
  );
};

export default WinningMessage;
