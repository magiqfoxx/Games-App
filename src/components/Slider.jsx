import React from "react";
import "./Slider.css";
import { randomPositions } from "./functions";

class Slider extends React.Component {
  state = {
    positions: {
      0: 5,
      1: 3,
      2: 2,
      3: 1,
      4: 7,
      5: 0,
      6: null,
      7: 4,
      8: 6
    },
    arrows: {
      3: "down",
      7: "left"
    }
  };

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
            className="image"
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
              className={`arrow arrow-${arrow}`}
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
          className="spot"
          id={`location-${location}`}
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
    let posArray = Object.values(this.state.positions);
    let i = -1;
    return posArray.map(el => {
      i += 1;
      return this.drawPiece(i, el);
    });
  };

  drawBoard = () => {
    return this.drawPieces();
  };
  componentDidMount() {
    //this.updateArrows();
    //this.drawBoard();
    //return this.drawPieces();
  }
  startGame = () => {
    /* 1. choose a game -> picture is showed as whole
    2. start the game - timer is started, board is drawed 
    3. onClick - piece is moved if possible. check if game is won
    4. game is won - stop the timer. show the time */

    const positions = randomPositions(9);
    this.setState({ positions });
    //this.drawBoard();
    return this.drawPieces();
  };
  render() {
    return (
      <React.Fragment>
        <div className="slider">{this.drawPieces()}</div>
      </React.Fragment>
    );
  }
}

export default Slider;
