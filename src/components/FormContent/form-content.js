import React from 'react';
import {
  Select, InputLabel, TextField, Input,
} from '@material-ui/core';
import { string, func } from 'prop-types';
import { MGI_TYPE, LVMH_TYPE } from '../../libs/invoicemaker';
import { TYPE_PVP } from '../../constats/form-types';
import './styles.scss';

// return trueText if type === TYPE_PVP else return falseText
const textSelectorByType = (
  type,
  trueText,
  falseText,
) => (type.indexOf(TYPE_PVP) !== -1 ? trueText : falseText);


const FormContent = ({
  handleChange,
  writeItems,
  companyType,
  formType,
}) => {
  const onlyModel2 = () => {
    let element;
    if (formType.indexOf(TYPE_PVP) !== -1) {
      element = (
        <TextField
          placeholder="Imp. Rec. Público: "
          type="number"
          onChange={handleChange('impRecPubl')}
        />
      );
    }
    return element;
  };

  return (
    <div>
      <div className="columns-2">
        <TextField
          placeholder="Número de orden"
          onChange={handleChange('numOrden')}
          type="text"
          inputProps={{ maxLength: '11' }}
        />
        <div className="company-info">
          <InputLabel htmlFor="company-type">
            Servicio Técnico
          </InputLabel>
          <Select
            native
            value={companyType}
            onChange={handleChange('companyType')}
            inputProps={{
              id: 'company-type',
            }}
          >
            <option value={LVMH_TYPE}>
              LVMH
            </option>
            <option value={MGI_TYPE}>
              MGI
            </option>
          </Select>
        </div>
      </div>
      <div className="form-item">
        <div className="columns-3">
          <TextField
            placeholder="Nombre cliente"
            onChange={handleChange('customer')}
            type="text"
            inputProps={{ maxLength: '44' }}
          />
          <TextField
            placeholder={textSelectorByType(formType, 'Telefono', 'Dirección 1')}
            onChange={handleChange('tlfno')}
            type="text"
            inputProps={textSelectorByType(formType, { maxLength: '11' }, { maxLength: '22' })}
          />
          <TextField
            placeholder={textSelectorByType(formType, 'Dni', 'Dirección 2')}
            onChange={handleChange('dni')}
            type="text"
            inputProps={textSelectorByType(formType, { maxLength: '9' }, { maxLength: '22' })}
          />
          <TextField
            className="span-3"
            placeholder="Plaza"
            onChange={handleChange('location')}
            type="text"
            inputProps={textSelectorByType(formType, { maxLength: '29' }, { maxLength: '22' })}
          />
        </div>
        <div className="columns-3">
          <TextField
            label="Fecha de entrada"
            onChange={handleChange('entryDate')}
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            placeholder="Presupuesto"
            onChange={handleChange('budget')}
            type="text"
          />
          <TextField
            placeholder="Modelo"
            onChange={handleChange('model')}
            type="text"
          />
          <TextField
            placeholder="Num caja"
            onChange={handleChange('box')}
            type="text"
          />
          <TextField
            name="control"
            placeholder="Num control"
            onChange={handleChange('control')}
            type="text"
          />
        </div>
      </div>
      <div className="columns-2">
        <TextField
          placeholder="Nº de Consecionario"
          type="number"
          onChange={handleChange('nconsecionario')}
        />
        <TextField
          label="Fecha de entrega"
          onChange={handleChange('deliveryDate')}
          type="date"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          name="shipping"
          min="0"
          step="0.25"
          placeholder="Gastos de envio"
          onChange={handleChange('shipping')}
          type="number"
        />
        {onlyModel2()}
      </div>
      <div className="full-width">
        <Input
          multiline
          placeholder="Observaciones"
          className="moreinfo"
          onChange={handleChange('moreInfo')}
        />
      </div>
      <div className="full-width">
        { writeItems() }
      </div>
    </div>
  );
};

FormContent.propTypes = {
  handleChange: func.isRequired,
  writeItems: func.isRequired,
  companyType: string.isRequired,
  formType: string.isRequired,
};

export default FormContent;
