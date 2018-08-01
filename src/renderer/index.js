import React from 'react';
import { render } from 'react-dom';
import './style.scss';
import MainApp from './components/Main';

const App = () => <MainApp />;

render(<App />, document.getElementById('app'));
