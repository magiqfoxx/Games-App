import React, { Component } from "react";

class MemoPiece extends Component {
  state = {};

  turn = () => {
    this.props.pieceIsTurned(this.props.id);
  };

  renderContent = () => {
    let front = (
      <img
        className="front"
        src="img/front.jpg"
        onClick={this.turn}
        alt="front"
        key={`front-${this.props.piece}`}
      />
    );
    let back = (
      <img
        src={`img/${this.props.piece}.jpg`}
        alt={`${this.props.piece}`}
        key={this.props.id}
      />
    );
    if (this.props.pairsFound.find(el => el == this.props.piece)) {
      //this piece has been found
      setTimeout(() => {
        return null;
      }, 1000);
    } else if (!this.props.turned) {
      return [front, back];
    } else {
      return back;
    }
  };
  render() {
    return (
      <div
        className="board-memo__card"
        id={`card-${this.props.id}`}
        key={`card-${this.props.id}`}
      >
        {" "}
        {this.renderContent()}
      </div>
    );
  }
}

export default MemoPiece;
