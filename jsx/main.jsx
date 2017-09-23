import React from 'react';
import ReactDom from 'react-dom';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Home from './components/Home.jsx';
import CouncilorDetail from './components/CouncilorDetail.jsx';
import { fetchCouncilors } from './actions/councilor.jsx';
import OrderInput from './components/OrderInput.jsx';

import ScrollToTop from './components/ScrollToTop.jsx';

const middleware = applyMiddleware(thunk);

const initialState = {
  fetching: false,
  fetched: false,
  councilors: [],
  error: null,
};

const councilorReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_COUNCILORS_START': {
      return { ...state, fetching: true };
    }
    case 'FETCH_COUNCILORS_ERROR' : {
      return { ...state, fetching: false, error: action.payload };
    }
    case 'RECEIVE_COUNCILORS' : {
      return {
        ...state,
        fetching: false,
        fetched: true,
        councilors: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

// We're a little early here since we only have one reducer, but we may as well get ready.
const reducers = combineReducers({
  councilor: councilorReducer,
});

const store = createStore(reducers, middleware);

// Let's load our councilors
store.dispatch(fetchCouncilors());

function Application(props) {
  return (
    <Provider store={store}>
      <Router>
        <div className="site">
          <Header page="homepage" title="Portland Maine Voting&nbsp;Record" />
          <div className="main">
            <ScrollToTop>
              <Route exact path="/" component={Home} />
              <Route path="/councilors/:cid" component={CouncilorDetail} />
              <Route path="/input" component={OrderInput} />
            </ScrollToTop>
          </div>
          <Footer />
        </div>
      </Router>
    </Provider>
  );
}

ReactDom.render(
  <Application />,
  document.getElementById('root')
);
