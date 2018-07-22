import React, { Component } from 'react';
import { List, ListItem, ListItemText } from '@material-ui/core';

import { InvoiceMaker, LVMH_TYPE } from '../../libs/invoicemaker';
import { TYPE_PVP, TYPE_RESELLER } from '../../constats/form-types';
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

  onUpdateItem = (value) => {
    const { items } = this.state;
    const itemList = Object.assign([], [...items]);

    itemList[value.id] = value;
    if (JSON.stringify(items) !== JSON.stringify(itemList)) this.setState({ items: itemList });
  };

  writeItems = () => {
    const { items } = this.state;
    let list = [];

    if (items.length > 0) {
      list = [
        ...items.map(item => (
          <InvoiceItem
            key={item.id}
            id={item.id}
            onUpdate={this.onUpdateItem}
          />)),
      ];
    }
    return list;
  };

  generateDocument = (doc) => {
    const {
      companyType, shipping, items, formType,
    } = this.state;
    const invoiceMaker = new InvoiceMaker(doc);
    invoiceMaker.pdfSetCompanyHeader(companyType);
    invoiceMaker.pdfSetRjTictacInfo();
    invoiceMaker.pdfSetItems(items, shipping, formType);
    invoiceMaker.pdfSetDocumentBody(this.state);
    return invoiceMaker.getDoc();
  };

  handleAddItem = () => {
    const { items } = this.state;
    const newItem = {
      id: items.length, amount: 0, name: '', price: 0,
    };
    this.setState({
      items: [...items, newItem],
    });
  };

  handleChange = name => event => this.setState({ [name]: event.target.value });

  handleChangeToModel = model => () => this.setState({ formType: model });

  render = () => {
    const { formType, companyType } = this.state;
    return (
      <div className="layout">
        <TopBar className="topbar" title="Ordenes de Trabajo" getDocument={this.generateDocument} />
        <div className="main">
          <div className="left-menu">
            <List component="nav">
              <ListItem
                onClick={this.handleChangeToModel(TYPE_PVP)}
                button
                className={formType.indexOf(TYPE_PVP) !== -1 ? 'selected' : ''}
              >
                <ListItemText primary="PVP" />
              </ListItem>
              <ListItem
                button
                onClick={this.handleChangeToModel(TYPE_RESELLER)}
                className={formType.indexOf(TYPE_RESELLER) !== -1 ? 'selected' : ''}
              >
                <ListItemText primary="Distribuidor" />
              </ListItem>
            </List>
          </div>
          <div className="content">
            <FormContent
              handleChange={this.handleChange}
              writeItems={this.writeItems}
              companyType={companyType}
              formType={formType}
            />
          </div>
        </div>
        <div className="add">
          <button type="button" onClick={this.handleAddItem}>
            +
          </button>
        </div>
      </div>
    );
  };
}

export default MainApp;
