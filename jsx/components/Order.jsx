import React from 'react';
import PropTypes from 'prop-types';

const Order = props => {
  return (
    <div className="order">
      <div className="order__header">
        <div className="order__container">
          <div className="order__title">{props.title}</div>
        </div>
      </div>
      <div className="order__body">
        <div className="order__container">
          <div className="order__text">
            <p>{props.text}</p>
          </div>
        </div>
      </div>
      <div className="order__results"></div>
    </div>
  );
}

Order.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
}

export default Order;
