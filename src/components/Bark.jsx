import React, { Component } from "react";
import "./Bark.css";
import { newSeqNoR } from "./functions";
import Timer from "./Timer";
import GameWon from "./GameWon";
import BarkMenu from "./BarkMenu";
import BarkPiece from "./BarkPiece";

class Bark extends Component {
  constructor(props) {
    super(props);
    this.state = {
      difficulty: 3,
      level: 1,
      sequence: [],
      guessSeq: [],
      playing: null,
      gameIsStarted: false,
      gameIsWon: false,
      timeWhenStopped: 0
    };
  }

  makeNewSequence() {
    let newSequence = newSeqNoR(this.state.difficulty);
    this.setState({ sequence: newSequence });
  }

  playSequence = () => {
    //this.playBark = this.playBark.bind(this);
    let sequence = this.state.sequence;

    sequence.forEach(
      (el, i) =>
        setTimeout(() => {
          this.setState({ playing: el });
        }, 2000 * i + 1000) //wth
    );
    this.setState({ playing: null });
  };

  addNewGuess = thisPiece => {
    let guessSequence = this.state.guessSeq;
    guessSequence.push(thisPiece);
    this.setState({ guessSeq: guessSequence });
  };

  updateDifficulty = () => {
    let newDifficulty = this.state.difficulty + 1;
    if (newDifficulty === 6) {
      this.setState({ gameIsWon: true });
    } else {
      this.setState({ difficulty: newDifficulty });
    }
  };

  startGame = () => {
    //Creates a new random sequence
    this.makeNewSequence();
    this.setState({ gameIsStarted: true }); //starts timer
    //play the new sequence
    this.playSequence();
  };

  pieceIsClicked = piece => {
    let originalSequence = this.state.sequence;

    //add guess to guessing sequence
    this.addNewGuess(piece);
    let guessSequence = this.state.guessSeq;

    //check if this guess is correct
    if (originalSequence[guessSequence.length - 1] === piece) {
      console.log("correct");
      //check if the whole sequence is guessed
      if (guessSequence.length === originalSequence.length) {
        document.querySelector("h2").textContent = "Good";
        setTimeout(() => {
          document.querySelector("h2").textContent = `Level ${this.state
            .difficulty - 2}`;
        }, 2000);
        //update difficulty
        this.updateDifficulty();
        //start new game after 2s
        setTimeout(this.startGame, 2000);
      }
    } else {
      //this guess is wrong
      console.log("wrong");
      this.setState({ guessSeq: [] });
      this.playSequence();
    }
  };

  drawBoard = () => {
    let pieces = [...Array(this.state.difficulty).keys()];
    return pieces.map(el =>
      el === this.state.playing ? (
        <BarkPiece
          playing={true}
          pieceImg={el}
          pieceIsClicked={this.pieceIsClicked}
          key={el}
        />
      ) : (
        <BarkPiece
          playing={false}
          pieceImg={el}
          pieceIsClicked={this.pieceIsClicked}
          key={el}
        />
      )
    );
  };

  componentDidMount() {
    this.makeNewSequence();
  }
  render() {
    return (
      <React.Fragment>
        <BarkMenu
          points={this.state.points}
          onLevelChange={this.onLevelChange}
          startGame={this.startGame}
          playSequence={this.playSequence}
        />
        <div className="board--pieces__bark">{this.drawBoard()}</div>
        <Timer
          gameIsStarted={this.state.gameIsStarted}
          timeWhenStopped={this.timeWhenStopped}
        />
        {this.state.gameIsWon ? (
          <GameWon
            handleClose={this.handleMessageClose}
            timeWhenWon={this.state.timeWhenStopped}
          />
        ) : null}
      </React.Fragment>
    );
  }
}

export default Bark;
