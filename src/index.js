import React, { Component } from 'react';
import { render } from 'react-dom';
import './style.scss';

import blobStream from 'blob-stream';
import PDFDocument from 'pdfkit';


class App extends Component {


  render(){
    return <h1>Hello world!!</h1>
  }
}


render(<App />, document.getElementById('app'));