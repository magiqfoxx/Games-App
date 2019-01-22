import React, { Component } from "react";
import "./App.css";
import Board from "./components/Board";
import "./sass/main.scss";
import Menu from "./components/Menu";
import NavBar from "./components/NavBar";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { game: 0 };
  }
  gameChoice = game => {
    this.setState({ game: game });
  };
  render() {
    return (
      <div id="app">
        <Menu gameChoice={this.gameChoice} />
        <Board game={this.state.game} />
        <NavBar />
      </div>
    );
  }
}

export default App;
