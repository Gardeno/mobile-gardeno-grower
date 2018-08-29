import {
  LOADING_USER,
  LOADED_USER,
  REFRESHED_GROWS,
} from '../../types/Authenticated/home'

import { getFromApi } from '../helpers';

export const loadedUser = ({ email, grows, invitations }) => {
  return {
    type: LOADED_USER,
    email,
    grows,
    invitations,
  }
};

export const loadUser = (callback) => {
  return (dispatch, getState) => {
    dispatch({
      type: LOADING_USER,
    });
    getFromApi({
      url: '/accounts/me/',
      dispatch,
      failSilently: true,
      getState,
    }, (error, response) => {
      if (!error && response) {
        dispatch(loadedUser(response.data));
      }
      console.log(response);
      callback(error, response);
    });
  }
};

export const getMyGrows = (callback) => {
  return (dispatch, getState) => {
    dispatch({
      type: LOADING_USER,
    });
    getFromApi({
      url: '/accounts/me/grows/',
      dispatch,
      getState,
    }, (error, response) => {
      if (!error && response) {
        dispatch({
          type: REFRESHED_GROWS,
        });
        callback(null, response.data)
      } else {
        callback(error || 'Unable to get your grows');
      }
    });
  }
};
