import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import './invoice-item.scss';

import InputAdornment from '@material-ui/core/InputAdornment';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';

function InvoiceItem () {
  const [state, setState] = useSate({
    id: 0,
    amount: 1,
    name: '',
    price: 0.0,
  });

  // TODO
  // componentDidUpdate = () => {
  //   const { onUpdate, id } = this.props;
  //   this.state.id = id;
  //   onUpdate(this.state);
  // };

  function handleChange(event) {
    switch (event.target.name) {
      case 'amount':
        setState({ amount: event.target.value });
        break;
      case 'name':
        setState({ name: event.target.value });
        break;
      case 'price':
        setState({ price: event.target.value });
        break;
      default: break;
    }
  };

  const endAdornment = (
    <InputAdornment position="end">
    €
    </InputAdornment>
  );
   
  return (
    <Paper className="paper" elevation={4}>
      <TextField placeholder="Cantidad" name="amount" min="1" value={state.amount} type="number" onChange={handleChange} />
      <TextField placeholder="Nombre" name="name" value={state.name} type="text" onChange={handleChange} />
      <TextField
        className="text-right"
        placeholder="Precio"
        name="price"
        value={state.price}
        type="number"
        min="0"
        step="0.25"
        onChange={handleChange}
        InputProps={{
          endAdornment,
        }}
      />
    </Paper>
  );
}

InvoiceItem.propTypes = {
  id: PropTypes.number.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default InvoiceItem;
