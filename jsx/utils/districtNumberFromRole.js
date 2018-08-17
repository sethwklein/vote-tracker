// "District 2" -> 2, any thing else -> NaN (but that part is unused)
function districtNumberFromRole(role) {
  const i = role.lastIndexOf(' ');
  if (i < 0) {
    return NaN;
  }
  const s = role.slice(i + 1);
  return parseInt(s, 10);
}

module.exports = districtNumberFromRole;