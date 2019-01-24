import React from "react";
import "./Slider.css";
import { randomPositions } from "./functions";

class Slider extends React.Component {
  state = {
    positions: {
      0: 0,
      1: 1,
      2: 2,
      3: 3,
      4: 4,
      5: 5,
      6: 6,
      7: 7,
      8: 8
    },
    arrows: {}
  };
  positions = {};
  updateArrows = () => {
    let posOfNull = Number(
      Object.keys(Object.values(this.state.positions)).find(
        key => Object.values(this.state.positions)[key] === null
      )
    );
    let arrows = {};

    if (posOfNull < 6) {
      arrows[posOfNull + 3] = "up";
    }
    if (posOfNull > 2) {
      arrows[posOfNull - 3] = "down";
    }
    if (posOfNull !== 2 && posOfNull !== 5 && posOfNull !== 8) {
      arrows[posOfNull + 1] = "left";
    }
    if (posOfNull !== 0 && posOfNull !== 3 && posOfNull !== 6) {
      arrows[posOfNull - 1] = "right";
    }
    this.setState({ arrows: arrows });
  };

  slidePiece = location => {
    let pieceToMove = this.state.positions[location]; //name of piece at location
    let sequenceOfPieces = Object.values(this.state.positions); //sequence of pieces
    let posOfNull = Object.keys(sequenceOfPieces).find(
      key => sequenceOfPieces[key] === null
    );
    let positions = this.state.positions;

    //if pieceCanBeMoved === true;
    if (this.state.arrows[location] !== undefined) {
      for (let spot in positions) {
        if (Number(spot) === location) {
          positions[spot] = null;
        } else if (spot === posOfNull) {
          positions[spot] = pieceToMove;
        }
      }
      this.setState({ positions: positions });
      this.updateArrows();
    }
  };

  drawPiece = (location, piece) => {
    let renderImg = (piece, arrow = null) => {
      let pieceImg = "";
      if (piece === null) {
        pieceImg = "empty.png";
      } else {
        pieceImg = `${piece}.jpg`;
      }

      if (arrow === null) {
        return (
          <img
            className="board__slider--image"
            src={`../img/slider/${pieceImg}`}
            alt={`piece-${piece}`}
          />
        );
      } else {
        return (
          <React.Fragment>
            <img
              className="image"
              src={`../img/slider/${pieceImg}`}
              alt={`piece-${piece}`}
            />
            <img
              className={`board__slider--arrow board__slider--arrow-${arrow}`}
              alt={`Arrow ${arrow}`}
              src={`../img/slider/arrow-${arrow}.png`}
            />
          </React.Fragment>
        );
      }
    };
    let renderTheSpot = (piece, arrow = null) => {
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
    let arrows = this.state.arrows;
    if (arrows[location] !== undefined) {
      //piece has an arrow
      return renderTheSpot(piece, arrows[location]); //passing the direction of the arrow
    } else {
      return renderTheSpot(piece); //render without arrows
    }
  };

  drawPieces = () => {
    let positionValues = Object.values(this.state.positions);
    return positionValues.map((value, i) => {
      return this.drawPiece(i, value);
    });
  };

  componentDidMount() {}
  resetGame = () => {
    let keys = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    let values = shuffleArray([0, 1, null, 3, 4, 5, 6, 7, 8]);
    let positions = returnPositions(keys, values);
    let posOfNull = values.indexOf(null);
    this.setState({ positions });
  };
  startGame = () => {
    /* 1. choose a game -> picture is showed as whole
    2. start the game - timer is started, board is drawn 
    3. onClick - piece is moved if possible. check if game is won
    4. game is won - stop the timer. show the time */

    this.setState({ positions: this.positions });
    //this.drawBoard();
    return this.drawPieces();
  };
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
