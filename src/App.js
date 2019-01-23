import React, { Component } from "react";
import "./App.css";
import Board from "./components/Board";
import "./sass/main.scss";
import Menu from "./components/Menu";
import NavBar from "./components/NavBar";
import Timer from "./components/Timer";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { game: 0, gameIsStarted: false };
  }
  gameChoice = game => {
    this.setState({ game: game });
  };
  gameIsStarted = gameIsStarted => {
    this.setState({ gameIsStarted });
  };
  render() {
    return (
      <div id="app">
        <Menu gameChoice={this.gameChoice} />
        <Timer gameIsStarted={this.state.gameIsStarted} />
        <Board
          gameChoice={this.gameChoice}
          game={this.state.game}
          gameIsStarted={this.gameIsStarted}
        />
        <NavBar />
      </div>
    );
  }
}

export default App;
/*
To do:
Fix the Css / implement Sass
Make a logo
figure out what's going on with grid at 1200+ screen
Nav Bar: instructions? Or choice for theme/music and picture
All games: Add messages (and points?) when won
Add lifecycle functions
Maybe: add more picture options
Slider: refactor refactor refactor
esp. fix posOfNull or write a shuffle function instead
alternative to the empty/null piece
check if game is won
Memo: implement
Bark: Fix the timing issues and block clicking while sequence is playing
Timer: Finish implementing for all games, add saving time
Points: ?
Music: add icons and audio playing features
Themes: ?
Routing
Other possible games: connect the pipes
*/
