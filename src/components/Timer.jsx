import React, { Component } from "react";
import { connect } from "react-redux";
import { startTimer, stopTimer, resetTimer, timeWhenStopped } from "../actions";

class Timer extends Component {
  state = { time0: 0, hours: 0, minutes: 0, seconds: 0 };
  timeInterval;

  formatTime = (hours, minutes, seconds) => {
    if (hours < 1 && minutes < 1) {
      return `${seconds} s.`;
    } else if (hours < 1) {
      return `${minutes}min. and ${seconds}s.`;
    } else {
      return `${hours}h. ${minutes}min. and ${seconds}s.`;
    }
  };
  setTime = timeNow => {
    console.log(this.props.time);
    //sets the hours, minutes and seconds
    let msPassed = timeNow - this.state.time0;
    let hours = Math.floor(msPassed / 1000 / 60 / 60);
    let minutes = Math.floor((msPassed / 1000 / 60) % 60);
    if (this.state.seconds >= 59) {
      this.setState({ seconds: -1 });
    }
    let seconds = this.state.seconds + 1; //floor is wrong sometimes
    //let seconds = Math.floor((msPassed / 1000) % 60);
    console.log(this.state);
    //this throws an error
    this.setState({ hours, minutes, seconds });
    this.setState({
      timeNow: this.formatTime(
        this.state.hours,
        this.state.minutes,
        this.state.seconds
      )
    });
  };
  setTime0 = () => {
    this.setState({ time0: new Date().getTime() });
  };

  getTimeNow = () => {
    this.timeInterval = setInterval(() => {
      this.setTime(new Date().getTime());
    }, 1000);
  };
  startTimer = () => {
    //initiates time0 and sets up the timeinterval
    this.setTime0();
    this.getTimeNow();
  };
  stopTimer = () => {
    //this works
    clearInterval(this.timeInterval);
    this.props.timeWhenStopped(
      this.state.hours * 60 + this.state.minutes * 60 + this.state.seconds
    );
  };
  resetTimer = () => {
    this.setState = {
      time0: 0,
      timeNow: "",
      hours: 0,
      minutes: 0,
      seconds: 0
    };
  };
  componentWillUnmount = () => {
    console.log("unmount");
  };
  componentDidUpdate(oldProps) {
    //thx u/charliematters
    const newProps = this.props;

    if (oldProps.time !== newProps.time) {
      if (this.props.time === true) {
        this.startTimer();
      } else if (this.props.time === "reset") {
        this.resetTimer();
        this.stopTimer();
      } else if (this.props.time === false) {
        this.stopTimer();
      }
    }
  }

  render() {
    return <div id="timer">{this.state.timeNow}</div>;
  }
}
const mapStateToProps = state => {
  console.log(state);
  return {
    time: state.time,
    timeWhenStopped: state.timeWhenStopped
  };
};
export default connect(
  mapStateToProps,
  {
    startTimer,
    stopTimer,
    resetTimer,
    timeWhenStopped
  }
)(Timer);
