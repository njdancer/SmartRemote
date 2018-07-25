import React, { Component } from 'react';
import { Button } from 'reactstrap';

export default class TemperatureControl extends Component {
  decreaseTemp() {
    this.props.onChange(this.props.value - 1);
  }

  increaseTemp() {
    this.props.onChange(this.props.value + 1);
  }

  render() {
    return (
      <div className="TemperatureControl">
        <Button size="lg" outline onClick={this.decreaseTemp.bind(this)}>-</Button>
        <span>{this.props.value}</span>
        <Button size="lg" outline onClick={this.increaseTemp.bind(this)}>+</Button>
      </div>
    )
  }
}
