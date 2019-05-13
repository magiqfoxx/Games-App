import React, { Component } from "react";
import { Switch } from "react-router";
import { Route } from "react-router-dom";

import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import Audio from "./components/Audio.jsx";

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
        <Audio />
        <Footer />
      </div>
    );
  }
}
export default App;
//<Board gameChoice={this.gameChoice} game={this.state.game} />
/*
To do:
figure out what's going on with grid at 1200+ screen
Nav Bar: instructions? Or choice for theme/music and picture
Maybe: add more picture options
add listener for keyboard arrows
alternative to the empty/null piece
Timer: Finish implementing for all games, add saving time
Themes: ?
*/
