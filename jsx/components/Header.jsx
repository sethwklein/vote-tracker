import React from 'react';
import PropTypes from 'prop-types';

const Header = props => {
  return (
    <div className={"hero "+props.page+"__hero"}>
      <div className="hero__container">
        <div className="hero__text">{props.title}</div>
      </div>
    </div>
  );
}

// Page should be state
Header.propTypes = {
  title: PropTypes.string,
  page: PropTypes.string.isRequired,
}

export default Header;
