"use client";

import { Component, ReactNode } from "react";

// Model
type ItemProps = {
  label: string;
  selected: boolean;
};

export class OldItem extends Component {
  state: ItemProps;

  constructor(props: ItemProps) {
    super(props);

    this.state = {
      label: props.label,
      selected: props.selected,
    };
  }

  render(): ReactNode {
    return (
      <section className="flex flex-row gap-4">
        <input
          // Update
          onChange={() => {
            this.setState({
              ...this.state,
              selected: !this.state.selected,
            });
          }}
          type="checkbox"
          checked={this.state.selected}
        />
        <label>{this.state.label}</label>
      </section>
    );
  }
}
