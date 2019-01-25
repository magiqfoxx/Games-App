import React, { Component } from "react";

class Timer extends Component {
  state = { time0: 0, hours: 0, minutes: 0, seconds: 0 };
  componentWillReceiveProps = gameChange => {
    if (this.props.gameIsStarted !== gameChange.gameIsStarted) {
      this.timer();
    }
  };
  setTime = timeNow => {
    let msPassed = timeNow - this.state.time0;
    let hours = Math.floor(msPassed / 1000 / 60 / 60);
    let minutes = Math.floor((msPassed / 1000 / 60) % 60);
    if (this.state.seconds >= 59) {
      this.setState({ seconds: -1 });
    }
    let seconds = this.state.seconds + 1; //floor is wrong sometimes
    //let seconds = Math.floor((msPassed / 1000) % 60);
    this.setState({ hours, minutes, seconds });
  };
  timer = () => {
    let time0 = new Date().getTime();
    this.setState({ time0 });

    setInterval(() => {
      let time1 = new Date().getTime();
      this.setTime(time1);
    }, 1000);
  };
  componentDidMount() {}
  render() {
    return (
      <div id="timer">
        {this.state.hours}:{this.state.minutes}:{this.state.seconds}
      </div>
    );
  }
}

export default Timer;
