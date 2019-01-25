import React from "react";
import "./Slider.css";
import {
  findNull,
  findArrows,
  shuffleArray,
  returnPositions
} from "./functions";

class Slider extends React.Component {
  state = {
    positions: { 0: 0, 1: 1, 2: null, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8 },
    arrows: {}
  };

  checkIfGameWon() {
    let yourSequence = Object.values(this.state.positions);
    let correctSequence = [0, 1, null, 3, 4, 5, 6, 7, 8];

    if (JSON.stringify(yourSequence) == JSON.stringify(correctSequence)) {
      console.log("game is won");
      return true;
    }
  }
  slidePiece = location => {
    let imgToMove = this.state.positions[location]; //img of piece at location
    let positions = this.state.positions;
    let arrows = this.state.arrows;
    let posOfNull = findNull(positions);

    //if pieceCanBeMoved === true;
    if (arrows[location] !== undefined) {
      for (let spot in positions) {
        if (Number(spot) === location) {
          positions[spot] = null;
        } else if (Number(spot) === posOfNull) {
          positions[spot] = imgToMove;
        }
      }
      posOfNull = findNull(positions);
      if (!this.checkIfGameWon()) {
        this.setState({ positions });
        let arrows = findArrows(posOfNull);
        this.setState({ arrows });
      } else {
        this.setState({
          positions: { 0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8 }
        });
        this.setState({ arrows: {} });
      }
    }
  };

  drawPiece = (location, piece) => {
    let renderImg = (piece, arrow = undefined) => {
      let pieceImg;

      if (piece === null) {
        pieceImg = "empty.png";
      } else {
        pieceImg = `${piece}.jpg`;
      }

      let imgJSX = (
        <img
          className="board__slider--image"
          src={`../img/slider/${pieceImg}`}
          alt={`piece-${piece}`}
          key={`img-${piece}`}
        />
      );
      let arrowJSX = (
        <img
          className={`board__slider--arrow board__slider--arrow-${arrow}`}
          alt={`Arrow ${arrow}`}
          src={`../img/slider/arrow-${arrow}.png`}
          key={`img-${arrow}`}
        />
      );

      if (arrow === undefined) {
        return imgJSX;
      } else {
        return [imgJSX, arrowJSX];
      }
    };

    let renderTheSpot = (piece, arrow = undefined) => {
      return (
        <div
          className="board__slider--spot"
          id={`board__slider--location-${location}`}
          onClick={() => {
            this.slidePiece(location);
          }}
          key={location}
        >
          {renderImg(piece, arrow)}
        </div>
      );
    };

    return renderTheSpot(piece, this.state.arrows[location]);
  };

  drawPieces = () => {
    let positionValues = Object.values(this.state.positions);
    return positionValues.map((value, i) => {
      return this.drawPiece(i, value);
    });
  };

  resetGame = () => {
    let keys = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    let values = shuffleArray([0, 1, null, 3, 4, 5, 6, 7, 8]);
    let positions = returnPositions(keys, values);
    let posOfNull = values.indexOf(null);
    this.setState({ positions });
    let arrows = findArrows(posOfNull);
    this.setState({ arrows });
  };
  startGame = () => {
    this.resetGame();
    /* 1. choose a game -> picture is showed as whole
    2. start the game - timer is started, board is drawn 
    3. onClick - piece is moved if possible. check if game is won
    4. game is won - stop the timer. show the time */

    return this.drawPieces();
  };
  //change buttons into reset and show picture?
  //or "block" the start button
  //right now they both do the same thing
  render() {
    return (
      <React.Fragment>
        <div className="board--nav">
          <button className="button board--button" onClick={this.startGame}>
            Start
          </button>
          <button className="button board--button" onClick={this.resetGame}>
            Reset
          </button>
        </div>
        <div className="board__slider">{this.drawPieces()}</div>
      </React.Fragment>
    );
  }
}

export default Slider;
