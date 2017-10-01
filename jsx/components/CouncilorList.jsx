import React from 'react';
import PropTypes from 'prop-types';
import CouncilorCard from '../components/CouncilorCard.jsx';
import {BrowserRouter as Router, Link, Route} from 'react-router-dom';
import store from '../main.jsx';
import Slugify from '../utils/slugify';

// "District 2" -> 2, any thing else -> NaN (but that part is unused)
function districtNumberFromRole(role) {
  var i = role.lastIndexOf(" ");
  if (i < 0) {
    return NaN;
  }
  var s = role.slice(i+1);
  return parseInt(s, 10);
};

// Use in sort function to put list councilors in a sensible hierarchy
function establishRoleHierarchy(a, b) {
  // if role is equal, sort by name
  if (a.role === b.role) {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  }
  // after this point, we know role is different

  // mayor always sorts first
  if (a.role === 'Mayor') {
    return -1;
  }
  if (b.role === 'Mayor') {
    return 1;
  }

  // at large always sorts last
  if (a.role === 'At Large') {
    return 1;
  }
  if (b.role === 'At Large') {
    return -1;
  }

  // sort the districts by the integer at the end
  var aDistrict = districtNumberFromRole(a.role);
  if (aDistrict === NaN) {
    aDistrict = 0; // put parse errors first? last? i don't know! --sk
  }
  var bDistrict = districtNumberFromRole(b.role);
  if (bDistrict === NaN) {
    bDistrict = 0; // put parse errors first? last? i don't know! --sk
  }
  if (aDistrict < bDistrict) {
    return -1;
  }
  if (aDistrict > bDistrict) {
    return 1;
  }
  return 0;
}

const CouncilorList = props => {
  // This sorts alphabetically ...
  var councilors = props.councilors.sort(establishRoleHierarchy);

  var councilorComponents = councilors.map((councilor) => (
    <Link to={`/councilors/${Slugify(councilor.name)}`} key={councilor.name} className="councilor__link">
      <CouncilorCard
        name={councilor.name}
        slug={Slugify(councilor.name)}
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
  }))
}

export default CouncilorList;
