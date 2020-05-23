import React, {useState} from 'react';
import { List, ListItem, ListItemText } from '@material-ui/core';
import { InvoiceMaker, LVMH_TYPE } from '../../libs/invoicemaker';
import { TYPE_PVP, TYPE_RESELLER } from '../../constats/form-types';
import TopBar from '../TopBar';
import InvoiceItem from '../InvoiceItem';
import FormContent from '../FormContent';
import './main.scss';
import { OTHERS_TYPE } from '../../libs/invoicemaker/src';

const defaultState = {
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
  impRecPubl: 0,
};

function MainApp () {
  const [state, setState] = useState(defaultState)
  const [tempState, setTempState] = useState(defaultState)

  const onUpdateItem = (value) => {
    const { items } = state;
    const itemList = Object.assign([], [...items]);

    itemList[value.id] = value;
    if (JSON.stringify(items) !== JSON.stringify(itemList)) setState({ items: itemList });
  };

  const getFormData = () => {
    const {
      impRecPubl,
      numOrden,
      customer,
      tlfno,
      dni,
      location,
      entryDate,
      budget,
      box,
      model,
      control,
      nconsecionario,
      deliveryDate,
      shipping,
      moreInfo,
    } = state;

    return {
      impRecPubl,
      numOrden,
      customer,
      tlfno,
      dni,
      location,
      entryDate,
      budget,
      box,
      model,
      control,
      nconsecionario,
      deliveryDate,
      shipping,
      moreInfo,
    };
  }

 const recoverState = () => {
   if (tempState) {
     setState(tempState);
   }
 }

  const resetState = () => {
    setState(defaultState);
  }

  const writeItems = () => {
    const { items } = state;
    let list = [];

    if (items.length > 0) {
      list = [
        ...items.map(item => (
          <InvoiceItem
            key={item.id}
            id={item.id}
            onUpdate={onUpdateItem}
          />)),
      ];
    }
    return list;
  };

  const generateDocument = (doc) => {
    const {
      companyType, shipping, items, formType,
    } = state;
    const invoiceMaker = new InvoiceMaker(doc);
    if (companyType.indexOf(OTHERS_TYPE) !== -1) {
      invoiceMaker.pdfSetRjTictacInfo(20, companyType);
    } else {
      invoiceMaker.pdfSetCompanyHeader(companyType);
      invoiceMaker.pdfSetRjTictacInfo();
    }
    invoiceMaker.pdfSetItems(items, shipping, formType);
    invoiceMaker.pdfSetDocumentBody(state);
    resetState();
    return invoiceMaker.getDoc();
  };

  const handleAddItem = () => {
    const { items } = state;
    const newItem = {
      id: items.length, amount: 0, name: '', price: 0,
    };
    setState({
      items: [...items, newItem],
    });
  };

  const handleChange = name => event => setState({ [name]: event.target.value });

  const handleChangeToModel = model => () => setState({ formType: model });

  return (
    <div className="layout">
      <TopBar className="topbar" title="Ordenes de Trabajo" getDocument={generateDocument} recoverData={recoverState} recoverIsVisible={tempState.numOrden !== ''} />
      <div className="main">
        <div className="left-menu">
          <List component="nav">
            <ListItem
              onClick={handleChangeToModel(TYPE_PVP)}
              button
              className={state.formType.indexOf(TYPE_PVP) !== -1 ? 'selected' : ''}
            >
              <ListItemText primary="PVP" />
            </ListItem>
            <ListItem
              button
              onClick={handleChangeToModel(TYPE_RESELLER)}
              className={state.formType.indexOf(TYPE_RESELLER) !== -1 ? 'selected' : ''}
            >
              <ListItemText primary="Distribuidor" />
            </ListItem>
          </List>
        </div>
        <div className="content">
          <FormContent
            handleChange={handleChange}
            writeItems={writeItems}
            companyType={state.companyType}
            formFields={getFormData()}
            formType={state.formType}
          />
        </div>
      </div>
      <div className="add">
        <button type="button" onClick={handleAddItem}>
          +
        </button>
      </div>
    </div>
  );
}

export default MainApp;
