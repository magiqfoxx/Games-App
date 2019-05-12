import React, { Component } from "react";
import { Switch } from "react-router";
import { Route } from "react-router-dom";
//import "./App.css";

import Navigation from "./components/Nav/Navigation";
import Footer from "./components/Footer";

import Home from "./components/Home/Home";
import Slider from "./components/Slider/Slider";
import Memo from "./components/Memo/Memo";
import Bark from "./components/Bark/Bark";

import Page404 from "./components/Page404";
class App extends Component {
  render() {
    return (
      <div id="app">
        <Navigation />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/slider" component={Slider} />
          <Route path="/memo" component={Memo} />
          <Route path="/bark" component={Bark} />
          <Route component={Page404} />
        </Switch>
        <Footer />
      </div>
    );
  }
}
export default App;
//<Board gameChoice={this.gameChoice} game={this.state.game} />
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
add listener for keyboard arrows
alternative to the empty/null piece
check if game is won
Memo: implement
Bark: Fix the timing issues and block clicking while sequence is playing
Timer: Finish implementing for all games, add saving time
Points: ?
Music: add icons and audio playing features
Themes: ?

Other possible games: connect the pipes

done:
Routing 
*/
