import React, { Component } from 'react';
import { render } from 'react-dom';
import './style.scss';
import MainApp from './components/main';

class App extends Component {
  render = () => <MainApp />;
}

render(<App />, document.getElementById('app'));
