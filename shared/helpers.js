import { loggedIn, loadedAccounts, } from '../actions/auth';
import { KEYCHAIN_USERNAME } from '../config';

import * as Keychain from 'react-native-keychain';

export const persistToKeychain = async({ accounts, currentAccount }) => {
  try {
    await Keychain.setGenericPassword(KEYCHAIN_USERNAME, JSON.stringify({
      accounts: accounts.map((account) => {
        //We don't want to persist the wallet or balance properties (but we could?)
        return {
          account: account.account,
          seed: account.seed,
          name: account.name,
        }
      }),
      currentAccount,
    }));
  } catch (exception) {
    console.warn('Unable to persist to keychain: ', exception);
  }
};

export const loadKeychainData = async({ dispatch }) => {
  let existingKeychain;
  try {
    existingKeychain = await Keychain.getGenericPassword();
  } catch (exception) {
    return 'Unable to get keychain information';
  }
  let existingKeyChainData = { authToken: null };
  if (existingKeychain && typeof(existingKeychain.password) === 'string') {
    try {
      existingKeyChainData = JSON.parse(existingKeychain.password);
    } catch (exception) {
    }
  }
  dispatch(loadedAccounts({ ...existingKeyChainData }));
  dispatch(loggedIn({  }));
};