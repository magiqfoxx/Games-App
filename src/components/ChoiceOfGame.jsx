import React from "react";
import Slider from "./Slider";

class ChoiceOfGame extends React.Component {
  state = {};
  renderSlider() {
    return <Slider />;
  }
  render() {
    return (
      <React.Fragment>
        <h2>Please choose a game you want to play:</h2>
        <ul>
          <li onClick="renderSlider">Slider</li>
          <li>Simon Says</li>
          <li>Memo></li>
        </ul>
      </React.Fragment>
    );
  }
}

export default ChoiceOfGame;
