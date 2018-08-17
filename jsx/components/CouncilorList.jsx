import React from 'react';
import PropTypes from 'prop-types';
import CouncilorCard from '../components/CouncilorCard.jsx';
import {BrowserRouter as Router, Link, Route} from 'react-router-dom';
import store from '../main.jsx';
import slugify from '../utils/slugify';
import districtNumberFromRole from '../utils/districtNumberFromRole';
import establishRoleHierarchy from '../utils/establishRoleHierarchy';

const CouncilorList = (props) => {
  // This sorts alphabetically ...
  const councilors = props.councilors.sort(establishRoleHierarchy);

  const councilorComponents = councilors.map(councilor => (
    <Link to={`/councilors/${slugify(councilor.name)}`} key={councilor.name} className="councilor__link">
      <CouncilorCard
        name={councilor.name}
        slug={slugify(councilor.name)}
        role={councilor.role}
        img={councilor.img}
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
    role: PropTypes.string.isRequired,
    citypage: PropTypes.string,
  })).isRequired,
};

export default CouncilorList;
