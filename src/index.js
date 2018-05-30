import React, { Component } from 'react';
import { render } from 'react-dom';
import './style.scss';

import blobStream from 'blob-stream';
import PDFDocument from 'pdfkit';

class App extends Component {
  state = {
    numOrden: '',
    moreInfo: '',
    customer: '',
    tlfno: '',
    dni: '',
    location: '',
    entryDate:'',
    deliveryDate: '',
    budget: '', 
    model: '',
    box: '',
    control: '',
    items: [],
    pdfUrl: ''
  };

  makePDF = target => {
    const doc = new PDFDocument({ margin: 10 });
    const stream = doc.pipe(blobStream());

    this.generateDocument(doc);
    stream.on('finish', () => {
      const blob = stream.toBlob('application/pdf');
      if (this.state.pdfUrl.length > 0) window.URL.revokeObjectURL(this.state.pdfUrl);
      this.setState({ pdfUrl: window.URL.createObjectURL(blob) });
    });
  };

  generateDocument = doc => {
    doc.font('Courier', 10).text(`Nº Orden: ${this.state.numOrden}`, 490, 20);

    doc.rect(20, 200, 570, 75); // Client data box
    doc.fontSize(11).text('Cliente', 25, 207);
    doc.text(`:  ${this.state.customer.toLocaleUpperCase()}`, 100, 207,{width: 240});
    doc.text('Dirección', 25,236);
    doc.text(`:  TLF-${this.state.tlfno}`, 100, 236);
    doc.text(`:  DNI ${this.state.dni.toLocaleUpperCase()}`, 100, 248);
    doc.text('Plaza', 25, 262);
    doc.text(`:  ${this.state.location.toLocaleUpperCase()}`, 100, 262,{width: 240});

    doc.polygon([380, 200], [380, 275]); //Separator
    doc.text('Fecha de entrada', 385, 207);
    doc.text(`:  ${this.state.entryDate}`, 500, 207);
    doc.text('Presupuesto', 385, 222);
    doc.text(`:  ${this.state.budget}`, 500, 222);
    doc.text('Modelo', 385, 236);
    doc.text(`:  ${this.state.model}`, 500, 236);
    doc.text('Nº Caja', 385, 248);
    doc.text(`:  ${this.state.box}`, 500, 248);
    doc.text('Nº Control', 385, 262);
    doc.text(`:  ${this.state.control}`, 500, 262);

    doc.rect(20, 290, 570, 25); //Title
    doc.fontSize(12).text('DETALLE DE REPARACION - FORNITURA EMPLEADA', 23, 297);

    doc.polygon([20, 620], [590, 620]); // Footer Separator
    doc.fontSize(11).text('Nº Rep. Consecionario', 20, 625, { width: 195, align: 'left' });
    doc.polygon([200, 620], [200, 690], [400, 690], [400, 620]); //Footer content
    doc.text('Importe', 205, 625);
    doc.text('Gastos de envio', 205, 637);
    doc.text('I.G.I.C 7%', 205, 649);
    doc.moveDown();
    doc.text('TOTAL FACTURA');

    doc.rect(20, 700, 400, 70); //Observaciones
    doc.text('Observaciones:', 23, 705);
    doc.text(this.state.moreInfo, 23, 717, { width: 390, align: 'justify' });

    doc.rect(440, 700, 150, 35); //Fecha de entrega
    doc.text('Fecha de entrega', 443, 703, { width: 140, align: 'center' });
    doc.text(this.state.deliveryDate, 443, 717, { width: 140, align: 'center' });

    doc.stroke();
    doc.end();
  };

  handleChange = event => {
    switch(event.target.name){
      case 'numorder':
        this.setState({ numOrden: event.target.value });break;
      case 'customer':
        this.setState({ customer: event.target.value });break;
      case 'tlfno':
        this.setState({ tlfno: event.target.value });break;
      case 'dni':
        this.setState({ dni: event.target.value });break;
      case 'location':
        this.setState({ location: event.target.value });break;
      case 'moreinfo':
        this.setState({ moreInfo: event.target.value });break;
      case 'entrydate':
        this.setState({ entryDate: event.target.value });break;
      case 'budget':
        this.setState({ budget: event.target.value });break;
      case 'model':
        this.setState({ model: event.target.value });break;
      case 'box':
        this.setState({ box: event.target.value });break;
      case 'control':
        this.setState({ control: event.target.value });break;
      case 'delivery':
        this.setState({ deliveryDate: event.target.value });break;
    }
  };

  handleClick = event => {
    this.makePDF(event.target);
  };

  downLoadLink = () => {
    if (this.state.pdfUrl) {
      return (
        <a href={this.state.pdfUrl} download="generado.pdf">
          Download
        </a>
      );
    }
  };

  render = () => {
    return (
      <div className="root">
        <h1>Invoice Generator</h1>
        <p>{this.state.pdfUrl}</p>
        <input name="numorder" placeholder="Número de orden" onChange={this.handleChange} type="text" />
        <input name="customer" placeholder="Nombre cliente" onChange={this.handleChange} type="text" />
        <input name="tlfno" placeholder="Telefono" onChange={this.handleChange} type="text" />
        <input name="dni" placeholder="Dni" onChange={this.handleChange} type="text" />
        <input name="location" placeholder="Dirección" onChange={this.handleChange} type="text" />
        <input name="entrydate" placeholder="Fecha de entrada" onChange={this.handleChange} type="text" />
        <input name="budget" placeholder="Presupuesto" onChange={this.handleChange} type="text" />
        <input name="model" placeholder="Modelo" onChange={this.handleChange} type="text" />
        <input name="box" placeholder="Num caja" onChange={this.handleChange} type="text" />
        <input name="control" placeholder="Num control" onChange={this.handleChange} type="text" />
        <input name="delivery" placeholder="Fecha de entrega" onChange={this.handleChange} type="text" />
        <textarea placeholder="Observaciones" name="moreinfo" id="moreinfo" cols="30" rows="10" onChange={this.handleChange} />
        <button onClick={this.handleClick}>Generate PDF</button>
        {this.downLoadLink()}
      </div>
    );
  };
}

render(<App />, document.getElementById('app'));