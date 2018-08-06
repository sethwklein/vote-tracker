import React from 'react';
import PropTypes from 'prop-types';

const OrderInputFields = props => {
  return (
    <div className="orderFields">
      <form action="#">
        <label htmlFor=""></label>
        <input type="text" placeholder="Order Name"/>
        <input type="submit" value="Submit"/>
      </form>
    </div>
  );
}

export default OrderInputFields;
