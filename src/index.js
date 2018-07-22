import React, { Component } from 'react';
import { render } from 'react-dom';
import './style.scss';
import MainApp from './components/main';

const App = () => <MainApp />;

render(<App />, document.getElementById('app'));
