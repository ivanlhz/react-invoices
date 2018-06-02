import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/TextField';
import './invoice-item.scss'

import InputAdornment from '@material-ui/core/InputAdornment';
import Paper from '@material-ui/core/Paper';

class InvoiceItem extends Component {
  state = {
    id: this.props.id,
    amount: 1,
    name: '',
    price: 0.0
  };

  handleChange = event => {
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
    }
  };

  componentDidUpdate = (prevPorps, prevState, snapshot) => {
    this.props.onUpdate(this.state);
  };

  render() {
    return (
      <Paper className="paper" elevation={4}>
        <TextField placeholder="Cantidad" name="amount" min="1" value={this.state.amount} type="number" onChange={this.handleChange} />
        <TextField placeholder="Nombre" name="name" value={this.state.name} type="text" onChange={this.handleChange} />
        <TextField
        className="text-right"
        placeholder="Precio"
          name="price"
          value={this.state.price}
          type="number"
          min="0"
          step="0.25"
          onChange={this.handleChange}
          InputProps={{
            endAdornment: <InputAdornment position="end">€</InputAdornment>,
          }}
        />
      </Paper>
    );
  }
}

InvoiceItem.propTypes = {};

export default InvoiceItem;
