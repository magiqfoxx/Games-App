import React, { Component } from "react";

class BarkMenu extends Component {
  state = { difficulty: 3, level: 1 };

  render() {
    return (
      <React.Fragment>
        Points : {this.props.points}
        <h2>Level {this.state.difficulty - 2} </h2>
        <div className="board--menu">
          <button className="board--button" onClick={this.props.startGame}>
            Start new game
          </button>
          <button className="board--button" onClick={this.props.playSequence}>
            Play again
          </button>
        </div>
      </React.Fragment>
    );
  }
}

export default BarkMenu;
