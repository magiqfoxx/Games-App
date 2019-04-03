import React, { Component } from "react";
import { connect } from "react-redux";
import { startTimer, stopTimer, resetTimer, timeWhenStopped } from "../actions";

class Timer extends Component {
  state = { time0: 0, timeNow: 0, hours: 0, minutes: 0, seconds: 0 };
  timeInterval;

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
    this.setState({
      timeNow: this.formatState(
        this.state.hours,
        this.state.minutes,
        this.state.seconds
      )
    });
  };

  timer = () => {
    let time0 = new Date().getTime();
    this.setState({ time0 });

    this.timeInterval = setInterval(() => {
      let time1 = new Date().getTime();
      this.setTime(time1);
    }, 1000);
  };

  formatState = (hours, minutes, seconds) => {
    if (hours < 1 && minutes < 1) {
      return `${seconds} s.`;
    } else if (hours < 1) {
      return `${minutes}min. and ${seconds}s.`;
    } else {
      return `${hours}h. ${minutes}min. and ${seconds}s.`;
    }
  };

  componentDidUpdate(oldProps) {
    //thx u/charliematters
    const newProps = this.props;
    if (oldProps.time !== newProps.time) {
      if (this.props.time) {
        this.timer();
      } else if (this.props.time === "reset") {
        this.setState = {
          time0: 0,
          timeNow: 0,
          hours: 0,
          minutes: 0,
          seconds: 0
        };
      } else {
        this.props.timeWhenStopped(this.state.timeNow);
        clearInterval(this.timeInterval);
      }
    }
  }
  componentWillUnmount() {
    clearInterval(this.timeInterval);
  }
  render() {
    return <div id="timer">{this.state.timeNow}</div>;
  }
}
const mapStateToProps = state => {
  console.log(state);
  return {
    time: state.time
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
