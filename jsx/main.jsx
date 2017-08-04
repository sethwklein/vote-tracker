import React from 'react';
import ReactDom from 'react-dom';
import PropTypes from 'prop-types';
import {BrowserRouter as Router, Link, Route} from 'react-router-dom';

import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Home from './components/Home.jsx';
import CouncilorDetail from './components/CouncilorDetail.jsx';

import ScrollToTop from './components/ScrollToTop.jsx';

function Application(props) {

  return (
    <div>
      <Router>
      <div className="site">
        <Header page="homepage" title="Portland Maine Voting&nbsp;Record" />
        <div className="main">
          <ScrollToTop>
            <Route exact path="/" component={Home} />
            <Route path="/councilors/:cid" component={CouncilorDetail} />
          </ScrollToTop>
        </div>
        <Footer />
      </div>
      </Router>
    </div>
  );
}

ReactDom.render(
  <Application />,
  document.getElementById('root')
);
