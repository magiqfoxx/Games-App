import React, { Component } from "react";
import "./Bark.css";
import { newSeqNoR } from "./functions";

class Bark extends Component {
  constructor(props) {
    super(props);
    this.state = { difficulty: 3, level: 1, sequence: [], guessSeq: [] };
  }

  makeNewSequence() {
    let newSequence = newSeqNoR(this.state.difficulty);
    this.setState({ sequence: newSequence });
  }
  playBark = track => {
    document
      .getElementById(`board--piece__puppy-${track}`)
      .classList.add(
        `board--piece__puppy__playing`,
        `board--piece__puppy__playing-${track}`
      );
    let audio = new Audio(`../audio/bark/${track}.mp3`);
    audio.play();
    setTimeout(function() {
      document
        .getElementById(`board--piece__puppy-${track}`)
        .classList.remove(
          `board--piece__puppy__playing`,
          `board--piece__puppy__playing-${track}`
        );
    }, 2000);
  };
  playSequence = () => {
    this.playBark = this.playBark.bind(this);
    let sequence = this.state.sequence;

    sequence.forEach(el =>
      setTimeout(() => {
        this.playBark(this.state.sequence[el]);
      }, 2000 * el + 1000)
    );
  };
  addNewGuess = thisPiece => {
    let guessSequence = this.state.guessSeq;
    guessSequence.push(thisPiece);
    this.setState({ guessSeq: guessSequence });
  };
  updateDifficulty = () => {
    let newDifficulty = this.state.difficulty + 1;
    this.setState({ difficulty: newDifficulty });
  };
  pieceIsClicked = thisPiece => {
    //play piece => color and audio
    this.playBark(thisPiece);
    let originalSequence = this.state.sequence;

    //add guess to guessing sequence
    this.addNewGuess(thisPiece);
    let guessSequence = this.state.guessSeq;

    //check if this guess is correct
    if (originalSequence[guessSequence.length - 1] === thisPiece) {
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
  startGame = () => {
    //Creates a new random sequence
    this.makeNewSequence();
    this.props.gameIsStarted(true); //starts timer
    //play the new sequence
    this.playSequence();
  };

  renderPiece = pieceImg => {
    return (
      <img
        id={`board--piece__puppy-${pieceImg}`}
        className="board--piece__puppy"
        src={`../img/${pieceImg}.jpg`}
        alt="puppy"
        key={pieceImg}
        onClick={() => {
          this.pieceIsClicked(pieceImg);
        }}
      />
    );
  };
  renderBoard = () => {
    let pieces = [...Array(this.state.difficulty).keys()];
    return pieces.map(el => this.renderPiece(el));
  };

  componentDidMount() {
    this.makeNewSequence();
  }
  render() {
    return (
      <div class="board board__bark">
        <h2>Level {this.state.difficulty - 2}</h2>
        <div className="board--nav">
          <button className="board--button" onClick={this.startGame}>
            Start new game
          </button>
          <button className="board--button" onClick={this.playSequence}>
            Play again
          </button>
        </div>

        <div className="board--pieces__bark">{this.renderBoard()}</div>
      </div>
    );
  }
}

export default Bark;
