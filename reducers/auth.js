import {
  LOGGED_IN,
} from '../types/auth'

const defaultState = {
  authToken: null,
};

export default function home(state = defaultState, action) {
  switch (action.type) {
    case LOGGED_IN:
      return Object.assign({}, state, {
        authToken: action.authToken,
      });
    default:
      return state;
  }
}