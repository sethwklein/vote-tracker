import React from 'react';
import ReactDom from 'react-dom';
import PropTypes from 'prop-types';
import {BrowserRouter as Router, Link, Route} from 'react-router-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import axios from 'axios';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Home from './components/Home.jsx';
import CouncilorDetail from './components/CouncilorDetail.jsx';

import ScrollToTop from './components/ScrollToTop.jsx';

const middleware = applyMiddleware(thunk);

const userReducer = (state={}, action) => {
  return state;
}

const initialState = {
  fetching: false,
  fetched: false,
  councilors: [],
  error: null,
};

const councilorReducer = (state=initialState, action) => {
  switch(action.type) {
    case "FETCH_COUNCILORS_START": {
      return { ...state, fetching: true };
      break;
    }
    case "FETCH_COUNCILORS_ERROR" : {
      return { ...state, fetching: false, error: action.payload };
      break;
    }
    case "RECEIVE_COUNCILORS" : {
      return {
        ...state,
        fetching: false,
        fetched: true,
        councilors: action.payload,
      }
      break;
    }
  }
  return state;
}

const reducers = combineReducers({
  user: userReducer,
  councilor: councilorReducer
})

const store = createStore(reducers, middleware);

store.subscribe(() => {
  console.log("Store changed", store.getState())
});

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
