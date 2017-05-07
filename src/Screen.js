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
    // Passive event listeners disallow calling e.preventDefault()/e.stopPropagation() in
    // their handlers. This means that if you want to handle both touchstart and mousedown events
    // you must manually stop the propagation of the mousedown event on mobile.
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
    // Instead of attacching the onTouchStart and onMouseDown handlers directly to the React
    // components I'm attaching them as passive event listeners to prevent the touch delay.
    // More info here: https://github.com/WICG/EventListenerOptions/blob/gh-pages/explainer.md
    // and here: https://github.com/facebook/react/issues/6436
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
