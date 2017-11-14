import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Overview from '../components/Overview.jsx';
import CouncilorList from '../components/CouncilorList.jsx';
import OrderList from '../components/OrderList.jsx';
import store from '../main.jsx';

class Home extends React.Component {

  render() {

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
              {
              (this.props.info.councilor.fetching)
              ? <p>Loading…</p>
              : <CouncilorList councilors={this.props.info.councilor.councilors}/>
            }
            </div>
          </div>
        </section>
      </div>
    );
  }

};

const mapStateToProps = state => ({
  info: state
});

export default connect(mapStateToProps)(Home);
