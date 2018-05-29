import React, { Component } from 'react';
import { render } from 'react-dom';
import './style.scss';

import blobStream from 'blob-stream';
import PDFDocument from 'pdfkit';

class App extends Component{
  state = {
    text: '',
    pdfUrl: ''
  };

  makePDF = (target) => {
    const doc = new PDFDocument({margin:20});
    const stream = doc.pipe(blobStream());

    this.generateDocument(doc);
    stream.on('finish', () => {
      const blob = stream.toBlob('application/pdf');
      if(this.state.pdfUrl.length > 0) window.URL.revokeObjectURL(this.state.pdfUrl);
      this.setState({ pdfUrl:window.URL.createObjectURL(blob) });
    });
  };

  generateDocument = (doc) => {
    doc.font('Times-Roman', 23).text(this.state.text, 100, 100);

    doc.rect(20, 310, 570, 25);   //Title
    doc.font('Courier',12).text('DETALLE DE REPARACION - FORNITURA EMPLEADA', 23, 318);

    doc.polygon([380, 200], [380, 300]); //Client data
    doc.rect(20, 200, 570, 100); // Separator

    doc.polygon([20, 600], [590, 600]); 
    doc.polygon([200, 600], [200, 690], [400, 690],[400, 600]); 

    doc.rect(20, 700, 400, 70);   //Observaciones
    doc.fontSize(11).text('Observaciones:', 23, 705, { width:390,align: 'justify'});

    doc.rect(440, 700, 150, 35);  //Fecha de entrega
    doc.text('Fecha de entrega', 443, 703, { width:140,align: 'center'});

    doc.stroke();
    doc.end();
  }

  handleChange =(event) =>{
    this.setState({text: event.target.value});
  }

  handleClick = (event) => {
    this.makePDF(event.target)
  }

  downLoadLink = () => {
    if(this.state.pdfUrl){
      return <a href={this.state.pdfUrl} download="generado.pdf">Download</a>
    }
  }

  render = () => {
    return (
      <div className="root">
        <h1>Invoice Generator</h1>
        <p>{this.state.pdfUrl}</p>
        <input onChange={this.handleChange} type="text"/>
        <button onClick={this.handleClick}>Generate PDF</button>
        {
          this.downLoadLink()
        }
      </div>
    );
  };
}

render(<App />, document.getElementById('app'));