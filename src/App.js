/* @flow */
import React, { Component } from 'react';
import './App.css';

type State = {
  currentScreen: 'READY' | 'SET' | 'GO' | 'TOO_FAST',
  lastScore: ?number,
};

const randomNumFromInterval = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export default class App extends Component<void, {}, State> {
  showGoScreenTimer = null;
  goScreenTime: number = null;
  state = {
    currentScreen: 'READY',
    lastScore: null,
  };

  renderReadyScreen = () => {
    const handleClick = (event: any) => {
      event.preventDefault();
      const delay = randomNumFromInterval(1000, 4000);
      this.setState({ currentScreen: 'SET' });
      this.showGoScreenTimer = setTimeout(() => {
        this.setState({ currentScreen: 'GO' }, () => {
          this.goScreenTime = Date.now();
        });
      }, delay);
    };
    return (
      <div className={'Ready-container'} onMouseDown={handleClick} onTouchStart={handleClick}>
        <h1>{'READY'}</h1>
        {this.state.lastScore && <h1>{`${this.state.lastScore} MS`}</h1>}
      </div>
    );
  };

  renderSetScreen = () => {
    const handleClick = (event: any) => {
      event.preventDefault();
      clearTimeout(this.showGoScreenTimer);
      this.showGoScreenTimer = null;
      this.setState({ currentScreen: 'TOO_FAST' });
    };
    return (
      <div className={'Set-container'} onMouseDown={handleClick} onTouchStart={handleClick}>
        <h1>{'SET'}</h1>
      </div>
    );
  };

  renderGoScreen = () => {
    const handleClick = (event: any) => {
      event.preventDefault();
      const score = Date.now() - this.goScreenTime;
      clearTimeout(this.showGoScreenTimer);
      this.showGoScreenTimer = null;
      this.setState({ currentScreen: 'READY', lastScore: score });
    };
    return (
      <div className={'Go-container'} onTouchStart={handleClick} onMouseDown={handleClick}>
        <h1>{'GO!'}</h1>
      </div>
    );
  };

  renderTooFastScreen = () => {
    const handleClick = (event: any) => {
      event.preventDefault();
      this.setState({ currentScreen: 'READY', lastScore: null });
    };
    return (
      <div className={'TooFast-container'} onMouseDown={handleClick} onTouchStart={handleClick}>
        <h1>{'TOO FAST!'}</h1>
      </div>
    );
  };

  render() {
    let content;
    switch (this.state.currentScreen) {
      case 'READY': {
        content = this.renderReadyScreen();
        break;
      }
      case 'SET': {
        content = this.renderSetScreen();
        break;
      }
      case 'GO': {
        content = this.renderGoScreen();
        break;
      }
      case 'TOO_FAST': {
        content = this.renderTooFastScreen();
        break;
      }
      default: {
        content = <div />;
        break;
      }
    }
    return (
      <div className={'App-container'}>
        {content}
      </div>
    );
  }
}
