import React from "react";
import { connect } from "react-redux";
import { randomizeAction, incrementMoves, movePieceAction } from "../actions";

import "./Slider.css";

/* Implement a CSS solution for no grid browsers */
//store.getState()
const Slider = props => {
  let startTimer = () => {
    console.log("time");
  };
  let movePiece = piece => {
    props.movePieceAction(props.order, piece);
    console.log(props.order, piece);
  };
  let drawPieces = () => {
    //get 'pieces' from the store
    let pieces = props.order;
    return props.order.map(piece => {
      // the null piece has to be a png, unlike the rest
      let piecePic;
      if (piece === null) {
        piecePic = "empty.png";
      } else {
        piecePic = piece + ".jpg";
      }
      return (
        <div className="slider--spot" key={piece}>
          <img
            src={`/img/slider/${piecePic}`}
            onClick={() => props.movePieceAction(props.order, piece)}
          />
        </div>
      );
    });
  };
  let drawBoard = () => {
    return drawPieces();
  };
  let startGame = () => {
    document.querySelector("#slider--button").innerHTML = "reset";
    props.randomizeAction(props.order);
    startTimer();
  };

  return (
    <main>
      <div>
        <button className="button" id="slider--button" onClick={startGame}>
          start
        </button>
      </div>
      <div className="slider--board">{drawBoard()}</div>
    </main>
  );
};

const mapStateToProps = state => {
  return { order: state.newOrder, moves: state.moves };
};
export default connect(
  mapStateToProps,
  { randomizeAction, incrementMoves, movePieceAction }
)(Slider);
