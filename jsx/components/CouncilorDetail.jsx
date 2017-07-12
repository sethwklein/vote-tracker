import React, { Component } from 'react';
import PropTypes from 'prop-types';
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

class CouncilorDetail extends Component {

  render() {
    const id = this.props.match.params.cid;

    const councilor = COUNCILORS.find(councilor => {
      if (councilor.slug == id) {
        return councilor;
      }
    });

    return (
      <div>
        <div className="container">
          <div className="councilor-detail">
            <div className="councilor-detail__photo">
              <img src='/static/pious-placeholder.jpg' alt='{councilor.name}'/>
            </div>
            <div className="councilor-detail__text">
              <div className="councilor-detail__name">{councilor.name}</div>
              <div className="councilor-detail__role">{councilor.role}</div>
            </div>
          </div>
        </div>
        <section className="section section--grey">
          <div className="container">
            <h1>Recent Orders</h1>
            <OrderList />
            <a href="#">See more orders</a>
          </div>
        </section>
      </div>
    );
  }
};

export default CouncilorDetail;
