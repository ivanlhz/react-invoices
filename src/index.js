import React, { Component } from 'react';
import { render } from 'react-dom';
import './style.scss';

import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';

import InvoiceItem from './components/invoice-item';
import TopBar from './components/top-bar';
import { InvoiceMaker, MGI_TYPE, LVMH_TYPE } from './libs/invoicemaker';

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
    shipping: 0.0,
  };

  writeItems = () => {
    let list = [];
    if (this.state.items.length > 0) {
      list = [
        ...this.state.items.map((item, index) => {
          return <InvoiceItem key={index} id={index} onUpdate={this.onUpdateItem} />;
        }),
      ];
    }
    return list;
  };

  onUpdateItem = value => {
    const itemList = Object.assign([], [...this.state.items]);
    itemList[value.id] = value;
    if (JSON.stringify(this.state.items) !== JSON.stringify(itemList)) this.setState({ items: itemList });
  };

  generateDocument = doc => {
    let invoiceMaker = new InvoiceMaker(doc);
    invoiceMaker.pdfSetCompanyHeader(this.state.companyType);
    invoiceMaker.pdfSetRjTictacInfo();
    invoiceMaker.pdfSetItems(this.state.items, this.state.shipping);
    invoiceMaker.pdfSetDocumentBody(this.state);
    return invoiceMaker.getDoc();
  };

  handleChange = name => event => this.setState({ [name]: event.target.value });

  handleAddItem = event => {
    this.setState({
      items: [...this.state.items, { amount: 0, name: '', price: 0 }],
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
                  id: 'company-type',
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
