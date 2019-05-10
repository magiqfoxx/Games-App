import React, { Component } from "react";
import audio_file from "../../audio/audio.mp3";
//Music: https://www.bensound.com

class Audio extends Component {
  state = { playing: false };
  componentDidMount = () => {};

  audioControl = action => {
    if (action === "play") {
      this.setState({ playing: true });
    } else if (action === "pause") {
      this.setState({ playing: false });
    }
  };
  playAudio = async () => {
    await document.getElementById("audio--file").play();
  };
  pauseAudio = async () => {
    await document.getElementById("audio--file").pause();
  };
  renderContent = () => {
    let icon;
    if (this.state.playing === true) {
      icon = "pause";
      this.playAudio();
    } else {
      icon = "play";
      //this.pauseAudio(); //can't happen onLoad
    }
    return (
      <img
        src={`./img/${icon}.png`}
        alt={icon}
        onClick={() => {
          this.audioControl(icon);
        }}
      />
    );
  };
  render() {
    return (
      <React.Fragment>
        <audio id="audio--file" src={audio_file} />
        <div id="audio">{this.renderContent()}</div>
      </React.Fragment>
    );
  }
}

export default Audio;
