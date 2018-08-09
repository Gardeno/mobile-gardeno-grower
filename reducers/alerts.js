import { ADD_ALERT, DISMISS_ALERT } from '../types/alerts';

export default (state = [], action) => {
  switch (action.type) {
    case ADD_ALERT:
      return [
        ...state,
        {
          id: action.id,
          message: action.message,
          messageType: action.messageType,
        }
      ];
    case DISMISS_ALERT:
      return state.filter(a => a.id !== action.id);
    default:
      return state;
  }
};