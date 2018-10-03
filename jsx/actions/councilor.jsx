import * as CouncilorActionTypes from '../actiontypes/councilor.jsx';
import axios from 'axios';

export const fetchCouncilors = () => {
  return function(dispatch) {
    axios.get('/api/v1/councilors/')
      .then((response) => {
        dispatch({ type: "RECEIVE_COUNCILORS", payload: response.data })
      })
      .catch((err) => {
        dispatch({ type: "FETCH_COUNCILORS_ERROR", payload: err })
      })
  };
};
