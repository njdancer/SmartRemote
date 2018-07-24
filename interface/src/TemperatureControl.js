import React, { Component } from 'react';

export default class TemperatureControl extends Component {
  render() {
    return (
      <div className="TemperatureControl">
        <button onClick={() => this.props.onChange(this.props.value - 1)}><span>-</span></button>
        <span>{this.props.value}</span>
        <button onClick={() => this.props.onChange(this.props.value + 1)}><span>+</span></button>
      </div>
    )
  }
}
