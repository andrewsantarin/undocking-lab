import React, { Component } from 'react';
import { connect, MapStateToProps, MapDispatchToProps } from 'react-redux';
import NewWindow from 'react-new-window';
import { generate as createUuid } from 'short-uuid';
import { GridOptions } from 'ag-grid-community';
import { parse, stringify } from 'query-string';

import { RootState } from './Root.state';

import { updateValue } from './Value.state';
import { SelectMenu, SelectMenuOption } from './Selection';
import { DataGrid } from './DataGrid';
import { AppParsedQuery } from './App.types';

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
  windows: {
    [key: string]: Window | null | undefined;
  }
};

export type ValueProps = ValueStateProps & ValueDispatchProps & ValueOwnProps;

const idToQueryString = (id: string): string => {
  const params = { id };
  return stringify(params);
}

const options: SelectMenuOption[] = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];

export class Value extends Component<ValueProps, ValueState> {
  state: ValueState = {
    value: 0,
    windows: {},
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

  createNewWindow = () => {
    const newWindowId = createUuid();
    const newWindows: ValueState['windows'] = {
      ...this.state.windows,
      [newWindowId]: null,
    };

    this.setState({
      windows: newWindows,
    });
  }

  handleOpen = (windowKey: string) => (newWindow: Window) => {
    const newWindows = {
      ...this.state.windows,
      [windowKey!]: newWindow,
    };

    console.log(newWindow);

    this.setState({
      windows: newWindows,
    });
  }

  doGetDocument = (windowKey: string) => {
    const { [windowKey]: newWindow } = this.state.windows;

    if (!newWindow) {
      return;
    }

    const getDocument: GridOptions['getDocument'] = () => newWindow.document;

    return getDocument;
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
        <SelectMenu
          options={options}
        />
        {Object.keys(windows).map((key) => (
          <NewWindow
            key={key}
            onOpen={this.handleOpen(key)}
          >
            <SelectMenu
              options={options}
            />
            <DataGrid getDocument={this.doGetDocument(key)} />
          </NewWindow>
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
