import React, { Component } from 'react';
import { render } from 'react-dom';
import './style.scss';

class App extends Component {
  doc = new jsPDF();

  render(){
    return <h1>Hello world!!</h1>
  }
}


render(<App />, document.getElementById('app'));