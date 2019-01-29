import React, { Component } from "react";
import { newSeqNoR } from "./functions";
import "./Memo.css";
import MemoPiece from "./MemoPiece";
import MemoMenu from "./MemoMenu";
import { returnPositions } from "./functions";

class Memo extends Component {
  state = {
    points: 0,
    boardSize: 0,
    positions: {}, //card-id:img
    turned: [], //by id
    pairsFound: [] //by img
  };

  onLevelChange = value => {
    //this.props.gameIsStarted(true);
    this.setState({ boardSize: value });
    let posValues = newSeqNoR(value).concat(newSeqNoR(value));
    let posKeys = [...Array(value * 2).keys()]; //crates an array for range(0,value)
    let positions = returnPositions(posKeys, posValues);
    this.setState({ positions });
  };
  addPoints = () => {
    let points = this.state.points + 100;
    this.setState({ points });
  };
  pairIsFound = id => {
    let positions = this.state.positions;
    let pairsFound = this.state.pairsFound;
    pairsFound.push(positions[id]);
    this.addPoints();
    this.setState({ turned: [] });
    this.setState({ pairsFound });

    if (this.state.pairsFound.length === this.state.boardSize) {
      this.props.gameIsWon(true);
    }
  };
  changeState = id => {
    let turned = this.state.turned;
    let positions = this.state.positions;

    if (turned.length < 2) {
    } else if (positions[turned[0]] !== positions[turned[1]]) {
      setTimeout(() => {
        this.setState({ turned: [] });
      }, 1500);
    } else if (positions[turned[0]] === positions[turned[1]]) {
      setTimeout(() => {
        this.pairIsFound(id);
      }, 1500);
    }
  };
  pieceIsTurned = id => {
    //done like this because otherwise state did not update
    if (this.state.turned.length < 2) {
      this.setState({ turned: [...this.state.turned, id] }, () => {
        this.changeState(id);
      });
    }
  };

  drawBoard = () => {
    let pieces = Object.values(this.state.positions);
    return pieces.map((piece, index) => {
      return (
        <MemoPiece
          pieceIsTurned={this.pieceIsTurned}
          piece={piece}
          id={index}
          key={index}
          //true if piece is turned
          turned={
            index === this.state.turned[0] || index === this.state.turned[1]
              ? true
              : false
          }
          pairsFound={this.state.pairsFound}
        />
      );
    });
  };
  componentDidMount = () => {};

  render() {
    return (
      <React.Fragment>
        <MemoMenu
          points={this.state.points}
          onLevelChange={this.onLevelChange}
        />
        <div className="board-memo">
          {this.props.startGame ? this.drawBoard() : null}
        </div>
      </React.Fragment>
    );
  }
}

export default Memo;
