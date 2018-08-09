import {
  LOADING_USER,
  LOADED_USER,
} from '../../types/Authenticated/home'

import { getFromApi } from '../helpers';

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
    }, callback);
  }
};

export const loadedUser = ({ email, grows, invitations }) => {
  return {
    type: LOADED_USER,
    email,
    grows,
    invitations,
  }
};