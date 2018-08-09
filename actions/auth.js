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

import { SERVER_AUTHENTICATION_EXPIRES_SERVICE, } from '../config';
import * as Keychain from 'react-native-keychain';

import { postToApi } from './helpers';

export const loggedIn = ({  }) => ({
  type: LOGGED_IN,
});

export const loggedOut = () => {
  //We delete the expiration of our key so that users are forced to receive another two factor code (and server auth token)
  Keychain.resetGenericPassword(SERVER_AUTHENTICATION_EXPIRES_SERVICE);
  return {
    type: LOGGED_OUT,
  }
};

export const signedUp = ({ wallet }) => ({
  type: SIGNED_UP,
  wallet,
});

export const loadedAccounts = ({ accounts, currentAccount }) => {
  return {
    type: LOADED_ACCOUNTS,
    accounts,
    currentAccount,
  }
};

export const receivedToken = ({ authToken }) => {
  return {
    type: RECEIVED_TOKEN,
    authToken,
  }
};

export const submitRegistration = ({email, firstName, lastName, password}, callback) => {
  return (dispatch) => {
    postToApi({
      url: '/accounts/register',
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