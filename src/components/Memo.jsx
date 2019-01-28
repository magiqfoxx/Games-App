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
    turned: [],
    pairsFound: []
  };

  onLevelChange = value => {
    this.setState({ boardSize: value });
    let posValues = newSeqNoR(value).concat(newSeqNoR(value));
    let posKeys = [...Array(value * 2).keys()]; //crates an array in range(0,value)
    let positions = returnPositions(posKeys, posValues);
    this.setState({ positions });
  };
  addPoints = () => {
    let points = this.state.points + 100;
    this.setState({ points });
    console.log(this.state.points, "points");
  };
  changeState = id => {
    let turned = this.state.turned;
    let positions = this.state.positions;
    if (turned.length < 2) {
      console.log("That's one turned");
    } else if (positions[turned[0]] !== positions[turned[1]]) {
      console.log("That's not a pair");
      setTimeout(() => {
        this.setState({ turned: [] });
      }, 1500);
    } else if (positions[turned[0]] === positions[turned[1]]) {
      console.log("that's a pair");
      setTimeout(() => {
        this.setState({ turned: [] });
      }, 1500);
      this.addPoints();
      let pairsFound = this.state.pairsFound;
      pairsFound.push(positions[id]);
      this.setState({ pairsFound });
    }
  };
  pieceIsTurned = id => {
    //done like this because otherwise state did not update
    this.setState({ turned: [...this.state.turned, id] }, () => {
      this.changeState(id);
    });
  };

  drawBoard = () => {
    //console.log(turned);
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
        <MemoMenu onLevelChange={this.onLevelChange} />
        <div className="board-memo">{this.drawBoard()}</div>
      </React.Fragment>
    );
  }
}

export default Memo;
