import React from 'react';
import PropTypes from 'prop-types';

import Overview from '../components/Overview.jsx';
import CouncilorList from '../components/CouncilorList.jsx';
import OrderList from '../components/OrderList.jsx';

const COUNCILORS = [
  {
    "name":"Justin Costa",
    "slug":"justin-costa",
    "role":"District 4",
    "citypage":"http://www.portlandmaine.gov"
  },
  {
    "name":"Ethan K. Strimling",
    "slug":"ethan-k-strimling",
    "role":"Mayor",
    "citypage":"http://www.portlandmaine.gov"
  },
  {
    "name":"Jill C. Duson",
    "slug":"jill-c-duson",
    "role":"At Large",
    "citypage":"http://www.portlandmaine.gov"
  },{
    "name":"Nicholas M. Mavodones, Jr.",
    "slug":"nicholas-m-mavodones-jr",
    "role":"At Large",
    "citypage":"http://www.portlandmaine.gov"
  },
  {
    "name":"Brian E. Batson",
    "slug":"brian-e-batson",
    "role":"District 3",
    "citypage":"http://www.portlandmaine.gov"
  },{
    "name":"Spencer Thibodeau",
    "slug":"spencer-thibodeau",
    "role":"District 2",
    "citypage":"http://www.portlandmaine.gov"
  },{
    "name":"Belinda S. Ray",
    "slug":"belinda-s-ray",
    "role":"District 1",
    "citypage":"http://www.portlandmaine.gov"
  },{
    "name":"David Brenerman",
    "slug":"david-brenerman",
    "role":"District 5",
    "citypage":"http://www.portlandmaine.gov"
  },{
    "name":"Pious Ali",
    "slug":"pious-ali",
    "role":"At Large",
    "citypage":"http://www.portlandmaine.gov"
  }
];

const Home = () => {
  return (
    <div>
      <Overview />

      <section className="section section--grey">
        <div className="container">
          <h1>Recent Orders</h1>
          <OrderList />
          <a href="#">See more orders</a>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h1>City Councilors</h1>
          <div className="section__body">
            <CouncilorList councilors={COUNCILORS}/>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
