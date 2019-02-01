import React, { Component } from "react";

class BarkPiece extends Component {
  state = {};

  //play bark when this.props.playing = true
  componentDidUpdate(oldProps) {
    //thx u/charliematters

    const newProps = this.props;
    if (oldProps.playing !== newProps.playing) {
      if (this.props.playing) {
        this.playBark();
      } else {
      }
    }
  }
  playBark = () => {
    //maybe do this with animation???
    let piece = this.props.pieceImg;

    document
      .getElementById(`board--piece__puppy-${piece}`)
      .classList.add(
        `board--piece__puppy__playing`,
        `board--piece__puppy__playing-${piece}`
      );
    let audio = new Audio(`../audio/bark/${piece}.mp3`);
    audio.play();
    setTimeout(function() {
      document
        .getElementById(`board--piece__puppy-${piece}`)
        .classList.remove(
          `board--piece__puppy__playing`,
          `board--piece__puppy__playing-${piece}`
        );
    }, 1000);
  };

  pieceIsClicked = () => {
    //play piece => color and audio
    this.playBark(this.props.pieceImg);
  };
  render() {
    return (
      <img
        id={`board--piece__puppy-${this.props.pieceImg}`}
        className="board--piece__puppy"
        src={`../img/${this.props.pieceImg}.jpg`}
        alt="puppy"
        key={this.props.pieceImg}
        onClick={() => {
          this.pieceIsClicked(this.pieceIsClicked);
        }}
      />
    );
  }
}

export default BarkPiece;
