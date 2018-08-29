import { combineReducers } from 'redux';
import auth from './auth';
import alerts from './alerts';
import home from './home';
import time from './time';

export default combineReducers({
  auth,
  alerts,
  home,
  time,
})