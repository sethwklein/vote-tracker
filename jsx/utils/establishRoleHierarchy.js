const districtNumberFromRole = require('./districtNumberFromRole.js');

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

module.exports = establishRoleHierarchy;