import React from 'react';
import { Select, InputLabel, TextField, Input } from '@material-ui/core';
import { MGI_TYPE, LVMH_TYPE } from '../../libs/invoicemaker';
import { TYPE_PVP } from '../../constats/form-types';
import {string, func} from 'prop-types';

const FormContent = ({handleChange, writeItems, companyType, formType}) => {
  const onlyModel2 = () => {
    let element;
    if (formType.indexOf(TYPE_PVP) !== -1) {
      element = (
        <div className="columns-2">
          <TextField placeholder="Nº de Consecionario" type="number" onChange={handleChange('nconsecionario')} />
          <TextField placeholder="Imp. Rec. Público: " type="number" onChange={handleChange('impRecPubl')} />
        </div>
      );
    }
    return element;
  };

  return (<div>
    <div className="columns-2">
      <TextField placeholder="Número de orden" onChange={handleChange('numOrden')} type="text" />
      <div className="company-info">
        <InputLabel htmlFor="company-type">Servicio Técnico </InputLabel>
        <Select
          native
          value={companyType}
          onChange={handleChange('companyType')}
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
        <TextField placeholder="Nombre cliente" onChange={handleChange('customer')} type="text" />
        <TextField placeholder="Telefono" onChange={handleChange('tlfno')} type="text" />
        <TextField placeholder="Dni" onChange={handleChange('dni')} type="text" />
        <TextField className="span-3" placeholder="Dirección" onChange={handleChange('location')} type="text" />
      </div>
      <div className="columns-3">
        <TextField placeholder="Fecha de entrada" onChange={handleChange('entryDate')} type="text" />
        <TextField placeholder="Presupuesto" onChange={handleChange('budget')} type="text" />
        <TextField placeholder="Modelo" onChange={handleChange('model')} type="text" />
        <TextField placeholder="Num caja" onChange={handleChange('box')} type="text" />
        <TextField name="control" placeholder="Num control" onChange={handleChange('control')} type="text" />
      </div>
    </div>
    {onlyModel2()}
    <div className="columns-2">
      <TextField placeholder="Fecha de entrega" onChange={handleChange('deliveryDate')} type="text" />
      <TextField
        name="shipping"
        min="0"
        step="0.25"
        placeholder="Gastos de envio"
        onChange={handleChange('shipping')}
        type="number"
      />
    </div>
    <div className="full-width">
      <Input
        multiline={true}
        placeholder="Observaciones"
        className="moreinfo"
        onChange={handleChange('moreInfo')}
      />
    </div>
    <div className="full-width">{writeItems()}</div>
  </div>
  );
};

FormContent.prototypes = {
  handleChange: func.isRequired, 
  writeItems: func.isRequired,
  companyType: string.isRequired,
  formType: string.isRequired
}

export default FormContent;
