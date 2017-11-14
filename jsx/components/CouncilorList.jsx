import React from 'react';
import PropTypes from 'prop-types';
import CouncilorCard from '../components/CouncilorCard.jsx';
import {BrowserRouter as Router, Link, Route} from 'react-router-dom';
import store from '../main.jsx';
import slugify from '../utils/slugify';

// "District 2" -> 2, any thing else -> NaN (but that part is unused)
function districtNumberFromRole(role) {
  const i = role.lastIndexOf(' ');
  if (i < 0) {
    return NaN;
  }
  const s = role.slice(i + 1);
  return parseInt(s, 10);
}

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
  let aDistrict = districtNumberFromRole(a.role);
  if (isNaN(aDistrict)) {
    aDistrict = 0; // put parse errors first? last? i don't know! --sk
  }
  let bDistrict = districtNumberFromRole(b.role);
  if (isNaN(bDistrict)) {
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
