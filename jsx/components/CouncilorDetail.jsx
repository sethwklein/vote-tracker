import React, { Component } from 'react';
import PropTypes from 'prop-types';
import OrderList from '../components/OrderList.jsx';
import { connect } from 'react-redux';

function slugify(str) {
    str = str.replace(/^\s+|\s+$/g, ''); // trim
    str = str.toLowerCase();

    // remove accents, swap ñ for n, etc
    var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
    var to   = "aaaaeeeeiiiioooouuuunc------";
    for (var i=0, l=from.length ; i<l ; i++) {
        str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
    }

    str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
        .replace(/\s+/g, '-') // collapse whitespace and replace by -
        .replace(/-+/g, '-'); // collapse dashes

    return str;
}

class CouncilorDetail extends Component {

  render() {
    const id = this.props.match.params.cid;

    const councilor = this.props.info.councilor.councilors.find(councilor => {
      const slug = slugify(councilor.name);
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
