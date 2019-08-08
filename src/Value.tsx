import React, { Component } from 'react';
import { connect, MapStateToProps, MapDispatchToProps } from 'react-redux';
import NewWindow from 'react-new-window';

import { RootState } from './Root.state';

import { updateValue } from './Value.state';

// Components
export interface ValueApi {
  fromWindow: string;
  createNewWindow: () => void;
}

export interface ValueApiWindow extends Window, Partial<ValueApi> { 
}

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
  windows: {
    [key: string]: string;
  }
};

export type ValueProps = ValueStateProps & ValueDispatchProps & ValueOwnProps;

const createWindowIdHref = (id: string) => {
  const { host, protocol, pathname } = window.location;

  return `${protocol}//${host}${pathname}?id=${id}`;
};

export class Value extends Component<ValueProps, ValueState> implements ValueApi {
  state: ValueState = {
    value: 0,
    windows: {},
  };

  componentDidMount() {
    this.fromWindow = (window as ValueApiWindow).fromWindow || this.fromWindow;
    this.createNewWindow = (window as ValueApiWindow).createNewWindow || this.createNewWindow;
  }

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

  fromWindow = window.location.href;

  createNewWindow = () => {
    console.log('Opening from', this.fromWindow);
    const newWindowId = Math.random().toString();
    const newWindows: ValueState['windows'] = {
      ...this.state.windows,
      [newWindowId]: createWindowIdHref(newWindowId),
    };

    this.setState({
      windows: newWindows,
    });
  }

  handleOpen = (window: Window) => {
    (window as ValueApiWindow).fromWindow = this.fromWindow;
    (window as ValueApiWindow).createNewWindow = this.createNewWindow;
  }

  render() {
    const { windows } = this.state;
    return (
      <div style={{ margin: 8 }}>
        <div><label><code>current url:</code></label> {window.location.href}</div>
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
        <button onClick={this.createNewWindow}>[+] Window</button>
        {Object.keys(windows).map((key) => (
          <NewWindow
            key={key}
            url={windows[key]}
            onOpen={this.handleOpen}
          />
        ))}
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
