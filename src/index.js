import React, { Component } from 'react';
import { render } from 'react-dom';
import './style.scss';

import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Icon from '@material-ui/core/Icon';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';

import InvoiceItem from './components/invoice-item';
import TopBar from './components/top-bar';

const LVMH_TYPE = 'lvmh';
const MGI_TYPE = 'mgi';

class App extends Component {
  state = {
    numOrden: '',
    moreInfo: '',
    customer: '',
    tlfno: '',
    dni: '',
    location: '',
    entryDate: '',
    deliveryDate: '',
    budget: '',
    model: '',
    box: '',
    control: '',
    items: [],
    companyType: LVMH_TYPE,
    shipping: 0.0
  };

  writeItems = () => {
    let list = [];
    if (this.state.items.length > 0) {
      list = [
        ...this.state.items.map((item, index) => {
          return <InvoiceItem key={index} id={index} onUpdate={this.onUpdateItem} />;
        })
      ];
    }
    return list;
  };

  onUpdateItem = value => {
    const itemList = Object.assign([], [...this.state.items]);
    itemList[value.id] = value;
    if (JSON.stringify(this.state.items) !== JSON.stringify(itemList)) this.setState({ items: itemList });
  };

  pdfWriteItems = doc => {
    let line = 0;
    let importe = 0;
    let igic = 0;
    let subtotal = 0;
    let total = 0;
    this.state.items.forEach(item => {
      if (item.amount > 0) {
        doc.fontSize(12).text(parseFloat(item.amount).toFixed(2), 23, 320 + line * 15);
        doc.text(item.name.toLocaleUpperCase(), 123, 320 + line * 15);
        doc.text(parseFloat(item.price).toFixed(2), 463, 320 + line * 15, { width: 100, align: 'right' });
        line += 1;
        importe += item.amount * item.price;
      }
    });
    subtotal = parseFloat(importe) + parseFloat(this.state.shipping);
    igic = parseFloat(importe) * 0.07;
    total = igic + subtotal;

    doc.text(parseFloat(importe).toFixed(2), 300, 625, { width: 95, align: 'right' });
    doc.text(parseFloat(this.state.shipping).toFixed(2), 300, 637, { width: 95, align: 'right' });
    doc.text(parseFloat(igic).toFixed(2), 300, 649, { width: 95, align: 'right' });
    doc.text(parseFloat(total).toFixed(2), 300, 672, { width: 95, align: 'right' });
  };

  generateDocument = doc => {
    doc.font('Courier', 10).text(`Nº Orden: ${this.state.numOrden}`, 490, 20);
    this.writeCompanyInfo(doc);
    this.pdfWriteItems(doc);
    doc.rect(20, 200, 570, 75); // Client data box
    doc.fontSize(11).text('Cliente', 25, 207);
    doc.text(`:  ${this.state.customer.toLocaleUpperCase()}`, 100, 207, { width: 240 });
    doc.text('Dirección', 25, 236);
    doc.text(`:  TLF-${this.state.tlfno}`, 100, 236);
    doc.text(`:  DNI ${this.state.dni.toLocaleUpperCase()}`, 100, 248);
    doc.text('Plaza', 25, 262);
    doc.text(`:  ${this.state.location.toLocaleUpperCase()}`, 100, 262, { width: 240 });

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

  writeCompanyInfo = doc => {
    this.state.companyType === LVMH_TYPE ? this.getLvmhInfo(doc) : this.getMgiInfo(doc);
    doc.fontSize(8).text('42.026.779-Y', 20, 90, { width: 195, align: 'center' });
    doc.text('C/SAN CLEMENTE, 8', 20, 105, { width: 195, align: 'center' });
    doc.text('38003 - SANTA CRUZ DE TENERIFE', 20, 120, { width: 195, align: 'center' });
    doc.text('922-24.23.85', 20, 135, { width: 195, align: 'center' });
    doc.text('Santa Cruz de Tenerife', 20, 150, { width: 195, align: 'center' });
    doc.text('Tenerife', 20, 165, { width: 195, align: 'center' });
  };

  getLvmhInfo = doc => {
    doc.fontSize(10);
    doc.text('LVMH RELOJERIA Y JOYERIA ESPAÑA', 20, 20, { width: 195, align: 'center' });
    doc.fontSize(8);
    doc.text('Servicio Técnico Oficial de Canarias', 20, 35, { width: 195, align: 'center' });
    doc.text('TAG-HEUER - ZENITH', 20, 50, { width: 195, align: 'center' });
    doc.text('CRISTIAN DIOR', 20, 65, { width: 195, align: 'center' });
  };

  getMgiInfo = doc => {
    doc.fontSize(12).text('MGI Luxury Group S.A', 20, 20, { width: 195, align: 'center' });
    doc.fontSize(10).text('EBEL', 20, 35, { width: 195, align: 'center' });
    doc.fontSize(6).text('Servicio Técnico Oficial Canarias', 20, 50, { width: 195, align: 'center' });
  };

  handleChange = name => event => this.setState({ [name]: event.target.value });
  

  handleAddItem = event => {
    this.setState({
      items: [...this.state.items, { amount: 0, name: '', price: 0 }]
    });
  };

  render = () => {
    return (
      <div className="root">
        <TopBar title="Ordenes de Trabajo" getDocument={this.generateDocument} />

        <section className="form">
          <div className="columns-2">
            <TextField placeholder="Número de orden" onChange={this.handleChange('numOrden')} type="text" />
            <div className="company-info">
              <InputLabel htmlFor="company-type">Servicio Técnico </InputLabel>
              <Select
                native
                value={this.state.companyType}
                onChange={this.handleChange('companyType')}
                inputProps={{
                  id: 'company-type'
                }}
              >
                <option value={LVMH_TYPE}>LVMH</option>
                <option value={MGI_TYPE}>MGI</option>
              </Select>
            </div>
          </div>
          <div className="form-item">
            <div className="columns-3">
              <TextField placeholder="Nombre cliente" onChange={this.handleChange('customer')} type="text" />
              <TextField placeholder="Telefono" onChange={this.handleChange('tlfno')} type="text" />
              <TextField placeholder="Dni" onChange={this.handleChange('dni')} type="text" />
              <TextField
                className="span-3"
                placeholder="Dirección"
                onChange={this.handleChange('location')}
                type="text"
              />
            </div>
            <div className="columns-3">
              <TextField placeholder="Fecha de entrada" onChange={this.handleChange('entryDate')} type="text" />
              <TextField placeholder="Presupuesto" onChange={this.handleChange('budget')} type="text" />
              <TextField placeholder="Modelo" onChange={this.handleChange('model')} type="text" />
              <TextField placeholder="Num caja" onChange={this.handleChange('box')} type="text" />
              <TextField name="control" placeholder="Num control" onChange={this.handleChange('control')} type="text" />
            </div>
          </div>
          <div className="columns-2">
            <TextField placeholder="Fecha de entrega" onChange={this.handleChange('deliveryDate')} type="text" />
            <TextField
              name="shipping"
              min="0"
              step="0.25"
              placeholder="Gastos de envio"
              onChange={this.handleChange('shipping')}
              type="number"
            />
          </div>
          <div className="full-width">
            <Input
              multiline={true}
              placeholder="Observaciones"
              className="moreinfo"
              onChange={this.handleChange('moreInfo')}
            />
          </div>
          <div className="full-width">{this.writeItems()}</div>
        </section>
        <div className="add">
          <Button onClick={this.handleAddItem} variant="fab" color="primary" aria-label="add">
            <AddIcon />
          </Button>
        </div>
      </div>
    );
  };
}

render(<App />, document.getElementById('app'));
