import React, { Component } from "react";
import { connect } from "react-redux";
import {
  startTimer,
  stopTimer,
  resetTimer,
  timeWhenStopped
} from "../../actions";

import { formatTime } from "./helper";

class Timer extends Component {
  state = { time0: 0, hours: 0, minutes: 0, seconds: 0 };
  timeInterval;

  calculateTime = timeNow => {
    let msPassed = timeNow - this.state.time0;
    let hours = Math.floor(msPassed / 1000 / 60 / 60);
    let minutes = Math.floor((msPassed / 1000 / 60) % 60);
    if (this.state.seconds >= 59) {
      this.setState({ seconds: -1 });
    } //floor is wrong sometimes
    let seconds = this.state.seconds + 1;
    //let seconds = Math.floor((msPassed / 1000) % 60);
    return [hours, minutes, seconds];
  };
  setTime = timeNow => {
    //sets the hours, minutes and seconds
    //based on time when timer was started and time now
    const time = this.calculateTime(timeNow);
    //this throws an error
    this.setState({
      hours: time[0],
      minutes: time[1],
      seconds: time[2]
    });
    this.setState({
      timeNow: formatTime(
        this.state.hours,
        this.state.minutes,
        this.state.seconds
      )
    });
  };
  setTime0 = () => {
    //gets the current time when timer is started
    this.setState({ time0: new Date().getTime() });
  };

  getTimeNow = () => {
    this.timeInterval = setInterval(() => {
      this.setTime(new Date().getTime());
    }, 1000);
  };

  startTimer = () => {
    /*this.setState = {
      time0: 0,
      hours: 0,
      minutes: 0,
      seconds: 0
    }; //???*/
    //initiates time0 and sets up the timeinterval
    this.setTime0();
    this.getTimeNow();
  };
  stopTimer = () => {
    //this works
    clearInterval(this.timeInterval);
    this.props.getTWS(
      formatTime(this.state.hours, this.state.minutes, this.state.seconds)
    );
    this.setState({
      timeWhenStopped: formatTime(
        this.state.hours,
        this.state.minutes,
        this.state.seconds
      )
    });
    this.setState({ hours: 0, minutes: 0, seconds: 0, timeNow: "" });
  };

  componentWillUnmount = () => {
    clearInterval(this.timeInterval);
    this.props.stopTimer();
  };

  componentDidUpdate(oldProps) {
    //thx u/charliematters
    const newProps = this.props;

    if (oldProps.time !== newProps.time) {
      if (this.props.time === true) {
        this.startTimer();
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
