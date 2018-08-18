import React from 'react';
import PropTypes from 'prop-types';

const CouncilorCard = props => {
  return (
    <div className={`councilor ${props.condensed && 'councilor--condensed'}`}>
      <div className="councilor__photo"><img src={'/s3/' + props.img} alt={props.name}/></div>
      <div className="councilor__details">
        <div className="councilor__name">{props.name}</div>
        <div className="councilor__title">{props.role}</div>
      </div>
    </div>
  );
};

CouncilorCard.propTypes = {
  name: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
};

export default CouncilorCard;
