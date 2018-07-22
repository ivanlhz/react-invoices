import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import './invoice-item.scss';

import InputAdornment from '@material-ui/core/InputAdornment';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';

class InvoiceItem extends Component {
  state = {
    amount: 1,
    name: '',
    price: 0.0,
  };

  componentDidUpdate = () => {
    const { onUpdate } = this.props;
    onUpdate(this.state);
  };

  handleChange = (event) => {
    switch (event.target.name) {
      case 'amount':
        this.setState({ amount: event.target.value });
        break;
      case 'name':
        this.setState({ name: event.target.value });
        break;
      case 'price':
        this.setState({ price: event.target.value });
        break;
      default: break;
    }
  };

  render() {
    const { price, amount, name } = this.state;
    const endAdornment = (
      <InputAdornment position="end">
      €
      </InputAdornment>
    );
    return (
      <Paper className="paper" elevation={4}>
        <TextField placeholder="Cantidad" name="amount" min="1" value={amount} type="number" onChange={this.handleChange} />
        <TextField placeholder="Nombre" name="name" value={name} type="text" onChange={this.handleChange} />
        <TextField
          className="text-right"
          placeholder="Precio"
          name="price"
          value={price}
          type="number"
          min="0"
          step="0.25"
          onChange={this.handleChange}
          InputProps={{
            endAdornment,
          }}
        />
      </Paper>
    );
  }
}

InvoiceItem.propTypes = {
  onUpdate: PropTypes.func.isRequired,
};

export default InvoiceItem;
