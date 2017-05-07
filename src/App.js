/* @flow */
import React, { Component } from 'react';
import Screen from './Screen';
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

  componentDidUpdate(prevProps: Props, prevState: State) {
    if (prevState.currentScreen !== this.state.currentScreen) {
      if (this.state.currentScreen === 'READY' || this.state.currentScreen === 'TOO_FAST') {
        clearTimeout(this.showGoScreenTimer);
        this.showGoScreenTimer = null;
      } else if (this.state.currentScreen === 'GO') {
        this.goScreenTime = Date.now();
      }
    }
  }

  renderReadyScreen = () => {
    const handleClick = (event: any) => {
      const delay = randomNumFromInterval(1000, 4000);
      this.setState({ currentScreen: 'SET' });
      this.showGoScreenTimer = setTimeout(() => {
        this.setState({ currentScreen: 'GO' });
      }, delay);
    };
    const subtitle = this.state.lastScore ? `${this.state.lastScore} MS` : undefined;
    return (
      <Screen
        onTouch={handleClick}
        title={'READY'}
        subtitle={subtitle}
        backgroundColor={'#EF6C00'}
      />
    );
  };

  renderSetScreen = () => {
    const handleClick = (event: any) => {
      this.setState({ currentScreen: 'TOO_FAST' });
    };
    return <Screen onTouch={handleClick} title={'SET'} backgroundColor={'#E53935'} />;
  };

  renderGoScreen = () => {
    const handleClick = (event: any) => {
      const score = Date.now() - this.goScreenTime;
      this.setState({ currentScreen: 'READY', lastScore: score });
    };
    return <Screen onTouch={handleClick} title={'GO!'} backgroundColor={'#009688'} />;
  };

  renderTooFastScreen = () => {
    const handleClick = (event: any) => {
      this.setState({ currentScreen: 'READY', lastScore: null });
    };
    return <Screen onTouch={handleClick} title={'TOO FAST'} backgroundColor={'#4285F4'} />;
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
