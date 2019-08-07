import React, { Component } from 'react';
import { connect, MapStateToProps, MapDispatchToProps } from 'react-redux';

import { RootState } from './Root.state';

import { updateValue } from './Value.state';

// Components
export type ValueStateProps = {
  value: number;
};

export type ValueDispatchProps = {
  updateValue(value: number): void;
};

export type ValueOwnProps = {

};

export type ValueState = {
  value: number;
};

export type ValueProps = ValueStateProps & ValueDispatchProps & ValueOwnProps;

const createNewWindow = () => {
  window.open(window.location.href);
};

export class Value extends Component<ValueProps, ValueState> {
  state: ValueState = {
    value: 0,
  };

  incrementValue = (value: number) => value + 1;
  decrementValue = (value: number) => value - 1;

  handleReactIncrementValueClick = () => {
    const newValue = this.incrementValue(this.state.value);
    const newState = {
      value: newValue,
    };
    this.setState(newState);
  }

  handleReactDecrementValueClick = () => {
    const newValue = this.decrementValue(this.state.value);
    const newState = {
      value: newValue,
    };
    this.setState(newState);
  }

  handleReduxIncrementValueClick = () => {
    const newValue = this.incrementValue(this.props.value);
    this.props.updateValue(newValue);
  }

  handleReduxDecrementValueClick = () => {
    const newValue = this.decrementValue(this.props.value);
    this.props.updateValue(newValue);
  }

  render() {
    return (
      <div style={{ margin: 8 }}>
        <div><label><code>react state:</code></label> {this.state.value}</div>
        <div>
          <button onClick={this.handleReactIncrementValueClick}>+</button>
          <button onClick={this.handleReactDecrementValueClick}>-</button>
        </div>
        <div><label><code>redux state:</code></label> {this.props.value}</div>
        <div>
          <button onClick={this.handleReduxIncrementValueClick}>+</button>
          <button onClick={this.handleReduxDecrementValueClick}>-</button>
        </div>
        <button onClick={createNewWindow}>[+] Window</button>
      </div>
    )
  }
}

const mapStateToProps: MapStateToProps<ValueStateProps, ValueOwnProps, RootState> = (state) => ({
  value: state.value.value,
});

const mapDispatchToProps: MapDispatchToProps<ValueDispatchProps, ValueOwnProps> = {
  updateValue,
};

export const ValueContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Value);
