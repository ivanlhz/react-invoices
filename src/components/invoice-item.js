import React, { Component } from 'react';
import PropTypes from 'prop-types';

class InvoiceItem extends Component {
  state = {
    id: this.props.id,
    amount: 1,
    name: '',
    price: 0.00
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
      <div>
        <input name="amount" min="1" value={this.state.amount} type="number" onChange={this.handleChange} />
        <input name="name" value={this.state.name} type="text" onChange={this.handleChange} />
        <input name="price" value={this.state.price} type="number" min="0" step="0.25" onChange={this.handleChange} />
      </div>
    );
  }
}

InvoiceItem.propTypes = {};

export default InvoiceItem;
