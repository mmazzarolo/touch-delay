/* @flow */
import React, { Component } from 'react';
import './Screen.css';

type Props = {
  title: string,
  subtitle: string,
  backgroundColor: string,
  onTouch: (event: any) => mixed,
};

export default class Screen extends Component<void, Props, void> {
  containerRef: any = null;
  eventPropagated: boolean = false;

  onTouch = (event: any) => {
    if (event.type === 'touchstart') {
      this.eventPropagated = true;
    } else {
      if (this.eventPropagated) {
        this.eventPropagated = false;
        return;
      }
    }
    this.props.onTouch();
  };

  componentDidMount() {
    this.containerRef.addEventListener('touchstart', this.onTouch, { passive: true });
    this.containerRef.addEventListener('mousedown', this.onTouch, { passive: true });
  }

  componentWillUnmount() {
    this.containerRef.removeEventListener('touhstart', this.onTouch, { passive: true });
    this.containerRef.removeEventListener('mousedown', this.onTouch, { passive: true });
  }

  render() {
    const { title, subtitle, backgroundColor } = this.props;
    return (
      <div
        ref={ref => this.containerRef = ref}
        className={'Screen-container'}
        style={{ backgroundColor }}
      >
        <h1>{title}</h1>
        {subtitle && <h1>{subtitle}</h1>}
      </div>
    );
  }
}
