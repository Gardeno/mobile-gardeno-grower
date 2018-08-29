const defaultState = { grows: [], invitations: [], };

import {
  LOADED_USER,
} from '../types/Authenticated/home'

export default function home(state = defaultState, action) {
  switch (action.type) {
    case LOADED_USER:
      return Object.assign({}, state, {
        grows: state.grows,
        invitations: state.invitations,
      });
    default:
      return state;
  }
}