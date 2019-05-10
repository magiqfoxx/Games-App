import React, { Component } from "react";

class MemoMenu extends Component {
  state = { value: 6 };
  handleChange = value => {
    this.setState({ value });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.onLevelChange(this.state.value);
  };

  render() {
    return (
      <div className="board-memo--menu">
        Points : {this.props.points}
        <form onSubmit={this.handleSubmit}>
          <input
            type="radio"
            name="level"
            value={6}
            onChange={() => this.handleChange(6)}
          />
          <label>12 pieces</label>

          <input
            type="radio"
            name="level"
            value="8"
            onChange={() => this.handleChange(8)}
          />
          <label>16 pieces</label>

          <input
            type="radio"
            name="level"
            value="10"
            onChange={() => this.handleChange(10)}
          />
          <label>20 pieces</label>

          <input className="board--button" type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default MemoMenu;
