import React from 'react';

const Overview = props => {
  return (
    <section className="overview section">
      <div className="container overview__container">
        <h1>Government Overview</h1>
        <div className="section__body">
          <p>From the <a href="http://www.portlandmaine.gov/132/City-Council">city website</a>, "The City of Portland operates under a Council-Manager form of government with a nine-member City Council, comprised of a popularly elected mayor, five district councilors and three at-large members. The mayor is elected by a majority of voters through ranked choice voting and serves a four-year term. The city’s five voting districts each elect one council member to represent their district and three at-large members are elected citywide. The eight councilors serve three-year staggered terms.</p>
          <p>The City Charter grants to the City Council all powers to enact, amend, or repeal rules, ordinances, and resolutions relating to the city’s property, affairs and government, to preserve the public peace, health and safety, to establish personnel policies, and giving effect to any vote of the city and to authorize the issuance of debt. The council adopts an annual budget for both municipal and school operations and provides for an annual audit. The council appoints the city manager, corporation counsel, and city clerk."</p>
        </div>
      </div>
    </section>
  );
}

export default Overview;
