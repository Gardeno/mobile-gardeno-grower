import {
  LOGGED_IN,
  LOGGED_OUT,
  SIGNED_UP,
  RECEIVED_NEW_BALANCE,
  RECEIVED_ACCOUNT_BALANCES,
  LOADED_ACCOUNTS,
  ADDED_ACCOUNT,
  SELECTED_ACCOUNT,
  RECEIVED_TOKEN,
  RENAMED_ACCOUNT,
  DELETED_ACCOUNT,
} from '../types/auth'

import { postToApi } from './helpers';

export const loggedIn = ({ authToken }) => ({
  type: LOGGED_IN,
  authToken,
});

export const loggedOut = () => {
  return {
    type: LOGGED_OUT,
  }
};

export const signedUp = ({ wallet }) => ({
  type: SIGNED_UP,
  wallet,
});

export const receivedToken = ({ authToken }) => {
  return {
    type: RECEIVED_TOKEN,
    authToken,
  }
};

export const submitSignIn = ({ email, password }, callback) => {
  return (dispatch) => {
    postToApi({
      url: '/accounts/signin/',
      body: {
        email,
        password,
      },
      dispatch,
      failSilently: true,
    }, callback)
  }
};

export const submitRegistration = ({ email, firstName, lastName, password }, callback) => {
  return (dispatch) => {
    postToApi({
      url: '/accounts/signup/',
      body: {
        email,
        firstName,
        lastName,
        password,
      },
      dispatch,
      failSilently: true,
    }, callback)
  }
};