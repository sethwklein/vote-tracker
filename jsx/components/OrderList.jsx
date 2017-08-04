import React from 'react';
import PropTypes from 'prop-types';
import Order from '../components/Order.jsx';

const ORDERS = [
  {
    "title": "Order 210-16/17",
    "text": "Order Approving Transfer of Funds Under 15 M.R.S. §§5824(3) and 5826(6) Re: Luis Garcia – Sponsored by Jon P. Jennings, City Manager.",
  },
  {
    "title": "Order 211-16/17",
    "text": "A short link",
  },
  {
    "title": "Order 212-16/17",
    "text": "A relatively larger and much more verbose order than the order you are already familiar with, Order Approving Transfer of Funds Under 15 M.R.S. §§5824(3) and 5826(6) Re: Luis Garcia – Sponsored by Jon P. Jennings, City Manager.",
  },
  {
    "title": "Order 213-16/17",
    "text": "Order Approving Transfer of Funds Under 15 M.R.S. §§5824(3) and 5826(6) Re: Luis Garcia – Sponsored by Jon P. Jennings, City Manager.",
  },
  {
    "title": "Order 214-16/17",
    "text": "Order Approving Transfer of Funds Under 15 M.R.S. §§5824(3) and 5826(6) Re: Luis Garcia – Sponsored by Jon P. Jennings, City Manager.",
  },
];


const OrderList = props => {
  var orderComponents = ORDERS.slice(0,4).map(test => (
    <Order
      title={test.title}
      text={test.text}
      key={test.title}
    />
  ));
  return (
    <div className="orders">
      {orderComponents}
    </div>
  );
}

export default OrderList;
