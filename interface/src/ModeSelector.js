import React, { Component } from 'react';
import { ButtonGroup, Button } from 'reactstrap';
import { fetchAc, updateAc } from './api';

const INDEX_MODE_MAP = {
  0: 1,
  1: 4,
  2: 0,
  3: 2,
  4: 3,
}
const MODE_INDEX_MAP = {};
for (var key in INDEX_MODE_MAP) {
    if (INDEX_MODE_MAP.hasOwnProperty(key)) {
        MODE_INDEX_MAP[INDEX_MODE_MAP[key]] = Number.parseInt(key, 10);
    }
}

const indexFromData = function(data) {
  return !data.power ? 5 : MODE_INDEX_MAP[data.mode];
}

const dataFromIndex = function(index) {
  return {
    power: (index !== 5),
    mode: INDEX_MODE_MAP[index],
  }
}

export default class ModeSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 5,
    }
  }

  componentDidMount() {
    fetchAc().then(data => {
      this.setState({
        "selectedIndex": indexFromData(data),
      })
    })
  }

  render() {
    return (
      <div>
        <ButtonGroup className="d-flex m-3" size="lg">
          <Button onClick={() => this.onButtonClick(0)} active={this.state.selectedIndex === 0} className="w-100" color="primary" outline>Cool</Button>
          <Button onClick={() => this.onButtonClick(1)} active={this.state.selectedIndex === 1} className="w-100" color="danger" outline>Heat</Button>
          <Button onClick={() => this.onButtonClick(2)} active={this.state.selectedIndex === 2} className="w-100" color="success" outline>Auto</Button>
        </ButtonGroup>
        <ButtonGroup className="d-flex m-3" size="lg">
          <Button onClick={() => this.onButtonClick(3)} active={this.state.selectedIndex === 3} className="w-100" color="warning" outline>Dry</Button>
          <Button onClick={() => this.onButtonClick(4)} active={this.state.selectedIndex === 4} className="w-100" color="secondary" outline>Fan</Button>
          <Button onClick={() => this.onButtonClick(5)} active={this.state.selectedIndex === 5} className="w-100" color="dark" outline>Off</Button>
        </ButtonGroup>
      </div>
    )
  }

  onButtonClick(selectedIndex) {
    updateAc(dataFromIndex(selectedIndex)).then(data => {
      this.setState({
        "selectedIndex": indexFromData(data),
      });
    });
  }

}
