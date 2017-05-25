import React from 'react';
import PropTypes from 'prop-types';

const Councilor = props => {
  return (
    <div className="councilor">
      <div className="councilor__photo"><img src={props.img} alt={props.name}/></div>
      <div className="councilor__details">
        <div className="councilor__name">{props.name}</div>
        <div className="councilor__title">{props.role}</div>
      </div>
    </div>
  );
}

Councilor.propTypes = {
  name: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
}

export default Councilor;
