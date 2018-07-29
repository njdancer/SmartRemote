import React, { Component } from 'react';
import { fetchAc, updateAc } from './api';
import './App.css';
import ModeSelector from './ModeSelector';
import TemperatureControl from './TemperatureControl';
import HeatButton from './HeatButton.js';
import CoolButton from './CoolButton.js';
import DryButton from './DryButton.js';


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

const modeIndexFromData = function(data) {
  return !data.power ? 5 : MODE_INDEX_MAP[data.mode];
}

const dataFromModeIndex = function(index) {
  return {
    power: (index !== 5),
    mode: INDEX_MODE_MAP[index],
  }
}


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      power: false,
      mode: 0,
      temp: 25,
    };
  }

  componentDidMount() {
    fetchAc().then(data => {
      this.setState(data);
    });
  }

  handleModeSelectorClick(index) {
    updateAc(dataFromModeIndex(index)).then(data => {
      this.setState(data);
    });
  }

  handleTemperatureChange(temp) {
    this.setState(Object.assign({}, {temp}));
    updateAc({temp}).then(data => {
      this.setState(data);
    });
  }

  render() {
    return (
      <div className="App">
        <ModeSelector selectedIndex={modeIndexFromData(this.state)} onClick={i => this.handleModeSelectorClick(i)}/>
        <TemperatureControl value={this.state.temp} onChange={temp => this.handleTemperatureChange(temp)}/>
        <HeatButton />
        <CoolButton />
        <DryButton />
      </div>
    );
  }
}

export default App;
