import React from "react";
import { connect } from "react-redux";
import {
  startTimer,
  stopTimer,
  resetTimer,
  addPoints,
  resetPoints,
  incrementMovement,
  resetMovement,
  setboardSize,
  setOrderMemo,
  randomizeMemo,
  setPairMemo,
  resetPairMemo
} from "../actions";

import "./Memo.css";
const Memo = props => {
  function startGame() {
    props.resetPairMemo();
    setOrderMemo(props.boardSize);
    props.randomizeMemo(props.order);
    props.startTimer();
    console.log(props.order);
  }
  function flipPiece(piece, index) {
    document.getElementById(`piece-back-${index}`).style.display = "none";
    console.log(props.pairMemo);
    if (props.pair.length === 0) {
      //first flip
      console.log("first flip");
      props.setPairMemo({ piece: index });
    } else if (Object.keys(props.pair)[0] === piece) {
      //a pair
      console.log("pair");
      //hide both
      document.getElementById(`piece-front-${index}`).style.display = "none";
      document.getElementById(
        `piece-front-${Object.values(props.pairMemo)[0]}`
      ).style.display = "none";
      props.resetPairMemo();
    } else {
      //not a pair
      console.log("wrong");
      document.getElementById(`piece-back-${index}`).style.display = "block";
      document.getElementById(
        `piece-back-${Object.values(props.pairMemo)[0]}`
      ).style.display = "block";
      props.resetPairMemo();
    }
  }
  function drawBoard() {
    return props.order.map((piece, index) => {
      return (
        <div className="piece" key={index}>
          <img
            src={`/img/${piece}.jpg`}
            className="piece-front"
            id={`piece-front-${index}`}
          />
          <img
            src={`/img/back.jpg`}
            className="piece-back"
            id={`piece-back-${index}`}
            onClick={() => flipPiece(piece, index)}
          />
        </div>
      );
    });
  }
  function setBoardSize(value) {
    console.log("size", props.boardSize);
    props.setboardSize(value);
  }

  return (
    <main>
      <div>
        <form id="form" name="board-size">
          12
          <input
            type="radio"
            name="board-size"
            value="12"
            onChange={() => setBoardSize(6)}
            defaultChecked
          />
          16
          <input
            type="radio"
            name="board-size"
            value="16"
            onChange={() => setBoardSize(8)}
          />
          20
          <input
            type="radio"
            name="board-size"
            value="20"
            onChange={() => setBoardSize(10)}
          />
        </form>
        <button
          type="submit"
          className="button"
          id="slider--button"
          onClick={startGame}
        >
          start
        </button>
      </div>
      <div className="board-memo">{drawBoard()}</div>
    </main>
  );
};

const mapStateToProps = state => {
  return {
    time: state.timerReducer,
    timeWhenStopped: state.timeWhenStopped,
    points: state.pointsReducer,
    moves: state.movesReducer,
    boardSize: state.boardSizeMemo,
    order: state.orderMemo,
    pair: state.pairMemo
  };
};
export default connect(
  mapStateToProps,
  {
    startTimer,
    stopTimer,
    resetTimer,
    addPoints,
    resetPoints,
    incrementMovement,
    resetMovement,
    setboardSize,
    setOrderMemo,
    randomizeMemo,
    setPairMemo,
    resetPairMemo
  }
)(Memo);

/*class Memo extends Component {
  

  onLevelChange = value => {
    this.setState({ boardSize: value });
    let posValues = newSeqNoR(value).concat(newSeqNoR(value));
    let posKeys = [...Array(value * 2).keys()]; //crates an array for range(0,value)
    let positions = returnPositions(posKeys, posValues);
    this.setState({ positions });
    this.setState({ gameIsStarted: true });
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
      this.setState({ gameIsWon: true });
      this.setState({ gameIsStarted: false });
      this.setState({ boardSize: 0 });
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

  timeWhenStopped = time => {
    this.setState({ timeWhenStopped: time });
  };
  handleMessageClose = () => {
    this.setState({ gameIsWon: false });
  };


  render() {
    return (
     
    );
  }
}

export default Memo;
*/
