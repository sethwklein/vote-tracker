import React from 'react';
import PropTypes from 'prop-types';
import Councilor from '../components/Councilor.jsx';
import {BrowserRouter as Router, Link, Route} from 'react-router-dom';

const CouncilorList = props => {
  // This sorts alphabetically ...
  var councilors = props.councilors.sort(function(a,b){
    if (a.role > b.role) {
      return 1;
    }
    if (a.role < b.role) {
      return -1;
    }
    return 0;
  });

  // ... and this monstrosity puts Mayor first and at-large last
  councilors = councilors.sort(function(a,b){
  if (a.role === "Mayor") {
    return -1;
  } else if (b.role === "Mayor") {
    return 1;
  } else if (a.role === "At Large") {
    return 1;
  } else if (b.role === "At Large") {
    return -1;
  } else {
    return 0;
  }
});

  var councilorComponents = councilors.map((councilor) => (
    <Link to={`/councilor/${councilor.slug}`} key={councilor.name} className="councilor__link">
      <Councilor
        name={councilor.name}
        slug={councilor.slug}
        role={councilor.role}
        img='static/pious-placeholder.jpg'
      />
    </Link>
  ));

  return (
    <div className="councilors">
      {councilorComponents}
    </div>
  );
};

CouncilorList.propTypes = {
  councilors: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    citypage: PropTypes.string,
  }))
}

export default CouncilorList;
