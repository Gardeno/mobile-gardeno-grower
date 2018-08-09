import { loggedIn, } from '../actions/auth';
import { KEYCHAIN_USERNAME } from '../config';


export const removeFromKeychain = async() => {
  try {
    Expo.SecureStore.deleteItemAsync(KEYCHAIN_USERNAME);
  } catch (exception) {
    console.warn('Unable to remove from keychain: ', exception);
  }
};

export const persistToKeychain = async({ authToken }) => {
  try {
    await Expo.SecureStore.setItemAsync(KEYCHAIN_USERNAME, JSON.stringify({
      authToken,
    }));
  } catch (exception) {
    console.warn('Unable to persist to keychain: ', exception);
  }
};

export const loadKeychainData = async() => {
  let existingKeychain;
  try {
    existingKeychain = await Expo.SecureStore.getItemAsync(KEYCHAIN_USERNAME);
  } catch (exception) {
    return ['Unable to get keychain information', ];
  }
  let existingKeyChainData = { authToken: null };
  if (existingKeychain && typeof(existingKeychain) === 'string') {
    try {
      existingKeyChainData = JSON.parse(existingKeychain);
    } catch (exception) {
      console.warn('Unable to parse keychain item: ', exception);
    }
  }
  return [null, existingKeyChainData];
};