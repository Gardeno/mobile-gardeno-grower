import { combineReducers } from 'redux';
import auth from './auth';
import alerts from './alerts';
import home from './home';

export default combineReducers({
  auth,
  alerts,
  home,
})