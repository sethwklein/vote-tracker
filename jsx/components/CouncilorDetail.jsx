import React, { Component } from 'react';
import PropTypes from 'prop-types';
import OrderList from '../components/OrderList.jsx';
import { connect } from 'react-redux';
import Slugify from '../utils/slugify';

class CouncilorDetail extends Component {

  render() {
    const id = this.props.match.params.cid;

    const councilor = this.props.info.councilor.councilors.find(councilor => {
      const slug = Slugify(councilor.name);
      if (slug == id) {
        return councilor;
      }
    });

    return (
      <div>
        <div className="container">
          <div className="councilor-detail">
            <div className="councilor-detail__photo">
              <img src={'/s3/' + councilor.img} alt={councilor.name}/>
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

const mapStateToProps = state => ({
  info: state
});

export default connect(mapStateToProps)(CouncilorDetail);
