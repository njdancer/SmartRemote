import React, { Component } from 'react';
import { ButtonGroup, Button } from 'reactstrap';

export default class ModeSelector extends Component {
  render() {
    return (
      <div>
        <ButtonGroup className="d-flex m-3" size="lg">
          <Button onClick={() => this.props.onClick(0)} active={this.props.selectedIndex === 0} className="w-100" color="primary" outline>Cool</Button>
          <Button onClick={() => this.props.onClick(1)} active={this.props.selectedIndex === 1} className="w-100" color="danger" outline>Heat</Button>
          <Button onClick={() => this.props.onClick(2)} active={this.props.selectedIndex === 2} className="w-100" color="success" outline>Auto</Button>
        </ButtonGroup>
        <ButtonGroup className="d-flex m-3" size="lg">
          <Button onClick={() => this.props.onClick(3)} active={this.props.selectedIndex === 3} className="w-100" color="warning" outline>Dry</Button>
          <Button onClick={() => this.props.onClick(4)} active={this.props.selectedIndex === 4} className="w-100" color="secondary" outline>Fan</Button>
          <Button onClick={() => this.props.onClick(5)} active={this.props.selectedIndex === 5} className="w-100" color="dark" outline>Off</Button>
        </ButtonGroup>
      </div>
    )
  }
}
