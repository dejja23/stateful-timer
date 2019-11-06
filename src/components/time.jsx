import React, { Component } from "react";

export default class Time extends Component {
  state = {
    time: 0,
    tag: "start",
    isStarted: true,
    interval: ""
  };
  timer = () => {
    let s = this.state.time / 1000;
    let h = parseInt(s / 3600);
    let m = h > 0 ? parseInt((s % 3600) / 60) : parseInt(s / 60);
    let sec = m > 0 || h > 0 ? parseInt(((s % 3600) % 60) % 60) : s;
    return { h, sec, m };
  };
  timeStart = () => {
    this.setState({ isStarted: !this.state.isStarted });
    this.state.isStarted
      ? this.setState({
          interval: setInterval(
            () => this.setState({ time: this.state.time + 1000 }),
            1000
          )
        })
      : clearInterval(this.state.interval);
  };
  timeReset = () => {
    this.setState({ time: 0, isStarted: true });
    clearInterval(this.state.interval);
  };
  render() {
    return (
      <div className="">
        <p className="time">
          {this.timer().h > 9 ? this.timer().h : "0" + this.timer().h}:
          {this.timer().m > 9 ? this.timer().m : "0" + this.timer().m}:
          {this.timer().sec > 9 ? this.timer().sec : "0" + this.timer().sec}
        </p>

        <div>
          <button
            className={
              "btn m-1" +
              (this.state.isStarted ? " btn-primary" : " btn-warning")
            }
            onClick={this.timeStart}
          >
            {this.state.isStarted ? "start" : "pause"}
          </button>
          <button className="btn btn-secondary m-1" onClick={this.timeReset}>
            Reset
          </button>
        </div>
      </div>
    );
  }
}
