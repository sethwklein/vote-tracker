import React from 'react';
import ReactDom from 'react-dom';

function Application() {
  return (
    <div>
      <div className="hero homepage__hero">
        <div className="hero__container">
          <div className="hero__text">Portland Maine Voting&nbsp;Record</div>
        </div>
      </div>
      <section className="overview section">
        <div className="container overview__container">
          <h1>Government Overview</h1>
          <div className="section__body">
            <p>From the <a href="http://www.portlandmaine.gov/132/City-Council">city website</a>, "The City of Portland operates under a Council-Manager form of government with a nine-member City Council, comprised of a popularly elected mayor, five district councilors and three at-large members. The mayor is elected by a majority of voters through ranked choice voting and serves a four-year term. The city’s five voting districts each elect one council member to represent their district and three at-large members are elected citywide. The eight councilors serve three-year staggered terms.</p>
            <p>The City Charter grants to the City Council all powers to enact, amend, or repeal rules, ordinances, and resolutions relating to the city’s property, affairs and government, to preserve the public peace, health and safety, to establish personnel policies, and giving effect to any vote of the city and to authorize the issuance of debt. The council adopts an annual budget for both municipal and school operations and provides for an annual audit. The council appoints the city manager, corporation counsel, and city clerk."</p>
          </div>
        </div>
      </section>
      <section className="section section--grey">
        <div className="container">
          <h1>Recent Orders</h1>
          <div className="orders">
            <div className="order">
              <div className="order__header">
                <div className="order__container">
                  <div className="order__title">Order 210-16/17</div>
                </div>
              </div>
              <div className="order__body">
                <div className="order__container">
                  <div className="order__text">
                    <p>Order Approving Transfer of Funds Under 15 M.R.S. §§5824(3) and 5826(6) Re: Luis Garcia – Sponsored by Jon P. Jennings, City Manager.</p>
                  </div>
                </div>
              </div>
              <div className="order__results"></div>
            </div>

            <div className="order">
              <div className="order__header">
                <div className="order__container">
                  <div className="order__title">Order 210-16/17</div>
                </div>
              </div>
              <div className="order__body">
                <div className="order__container">
                  <div className="order__text">
                    <p>A short order</p>
                  </div>
                </div>
              </div>
              <div className="order__results"></div>
            </div>

            <div className="order">
              <div className="order__header">
                <div className="order__container">
                  <div className="order__title">Order 210-16/17</div>
                </div>
              </div>
              <div className="order__body">
                <div className="order__container">
                  <div className="order__text">
                    <p>A relatively larger and much more verbose order than the order you are already familiar with, Order Approving Transfer of Funds Under 15 M.R.S. §§5824(3) and 5826(6) Re: Luis Garcia – Sponsored by Jon P. Jennings, City Manager.</p>
                  </div>
                </div>
              </div>
              <div className="order__results"></div>
            </div>

            <div className="order">
              <div className="order__header">
                <div className="order__container">
                  <div className="order__title">Order 210-16/17</div>
                </div>
              </div>
              <div className="order__body">
                <div className="order__container">
                  <div className="order__text">
                    <p>Order Approving Transfer of Funds Under 15 M.R.S. §§5824(3) and 5826(6) Re: Luis Garcia – Sponsored by Jon P. Jennings, City Manager.</p>
                  </div>
                </div>
              </div>
              <div className="order__results"></div>
            </div>


          </div>
          <a href="#">See more orders</a>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <h1>City Councilors</h1>
          <div className="section__body">
            <div className="councilors">
              <div className="councilor">
                <div className="councilor__photo"><img src="pious-placeholder.jpg" alt=""/></div>
                <div className="councilor__details">
                  <div className="councilor__name">Pious Ali</div>
                  <div className="councilor__title">At-Large</div>
                </div>
              </div>


              <div className="councilor">
                <div className="councilor__photo"><img src="pious-placeholder.jpg" alt=""/></div>
                <div className="councilor__details">
                  <div className="councilor__name">Pious Ali</div>
                  <div className="councilor__title">At-Large</div>
                </div>
              </div>

              <div className="councilor">
                <div className="councilor__photo"><img src="pious-placeholder.jpg" alt=""/></div>
                <div className="councilor__details">
                  <div className="councilor__name">Pious Ali</div>
                  <div className="councilor__title">At-Large</div>
                </div>
              </div>

              <div className="councilor">
                <div className="councilor__photo"><img src="pious-placeholder.jpg" alt=""/></div>
                <div className="councilor__details">
                  <div className="councilor__name">Pious Ali</div>
                  <div className="councilor__title">At-Large</div>
                </div>
              </div>

              <div className="councilor">
                <div className="councilor__photo"><img src="pious-placeholder.jpg" alt=""/></div>
                <div className="councilor__details">
                  <div className="councilor__name">Pious Ali</div>
                  <div className="councilor__title">At-Large</div>
                </div>
              </div>



            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

ReactDom.render(
  <Application />,
  document.getElementById('root')
);
