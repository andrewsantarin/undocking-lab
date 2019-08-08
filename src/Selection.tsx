import React, { Component } from 'react';
import Select from 'react-select';
import { ActionMeta, ValueType } from 'react-select/src/types';


export type SelectMenuOption = {
  label: string;
  value: string;
};

export interface SelectMenuProps {
  options?: SelectMenuOption[];
}

export interface SelectMenuState {
  selectedOption: ValueType<SelectMenuOption>;
}

export class SelectMenu extends Component<SelectMenuProps, SelectMenuState> {
  state: SelectMenuState = {
    selectedOption: null,
  };

  handleChange = (value: ValueType<SelectMenuOption>, actionMeta: ActionMeta) => {
    this.setState({ selectedOption: value });
    console.log(`Option selected:`, value);
  };

  render() {
    const { selectedOption } = this.state;

    return (
      <Select
        value={selectedOption}
        onChange={this.handleChange}
        options={this.props.options}
      />
    );
  }
}
