import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Header = props => {
  return (
    <Link to="/" className="no-underline">
      <div className={"hero "+props.page+"__hero"}>
        <div className="hero__container">
          <div className="hero__text">{props.title}</div>
        </div>
      </div>
    </Link>
  );
}

// Page should be state
Header.propTypes = {
  title: PropTypes.string,
  page: PropTypes.string.isRequired,
}

export default Header;
