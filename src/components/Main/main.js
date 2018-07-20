import React, { Component } from 'react';
import {Button, List, ListItem, ListItemText} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

import { InvoiceMaker, LVMH_TYPE } from '../../libs/invoicemaker';
import {TYPE_PVP, TYPE_RESELLER} from '../../constats/form-types';
import TopBar from '../TopBar';
import InvoiceItem from '../InvoiceItem';
import FormContent from '../FormContent';
import './main.scss';

class MainApp extends Component {
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
    nconsecionario: 0,
    companyType: LVMH_TYPE,
    shipping: 0.0,
    formType: TYPE_PVP,
    impRecPubl: '',
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

  onUpdateItem = (value) => {
    const itemList = Object.assign([], [...this.state.items]);
    itemList[value.id] = value;
    if (JSON.stringify(this.state.items) !== JSON.stringify(itemList)) this.setState({ items: itemList });
  };

  generateDocument = (doc) => {
    let invoiceMaker = new InvoiceMaker(doc);
    invoiceMaker.pdfSetCompanyHeader(this.state.companyType);
    invoiceMaker.pdfSetRjTictacInfo();
    invoiceMaker.pdfSetItems(this.state.items, this.state.shipping, this.state.formType);
    invoiceMaker.pdfSetDocumentBody(this.state);
    return invoiceMaker.getDoc();
  };

  handleAddItem = () => {
    this.setState({
      items: [...this.state.items, { amount: 0, name: '', price: 0 }],
    });
  };

  handleChange = (name) => (event) => this.setState({ [name]: event.target.value });
  
  handleChangeToModel = (model) => (event) => this.setState({ formType: model });

  render = () => {
    return (
      <div>
        <TopBar title="Ordenes de Trabajo" getDocument={this.generateDocument} />
        <div className="layout">
          <div className="left-menu">
            <List component="nav">
              <ListItem
                onClick={this.handleChangeToModel(TYPE_PVP)}
                button
                className={this.state.formType.indexOf(TYPE_PVP) !== -1 ? 'selected' : ''}
              >
                <ListItemText primary="PVP" />
              </ListItem>
              <ListItem
                button
                onClick={this.handleChangeToModel(TYPE_RESELLER)}
                className={this.state.formType.indexOf(TYPE_RESELLER) !== -1 ? 'selected' : ''}
              >
                <ListItemText primary="Distribuidor" />
              </ListItem>
            </List>
          </div>
          <div className="content">
            <FormContent 
              handleChange = {this.handleChange} 
              writeItems = {this.writeItems} 
              companyType = {this.state.companyType} 
              formType = {this.state.formType}
            />
          </div>
        </div>
        <div className="add">
          <Button onClick={this.handleAddItem} variant="fab" color="primary" aria-label="add">
            <AddIcon />
          </Button>
        </div>
      </div>
    );
  };
}

export default MainApp;
