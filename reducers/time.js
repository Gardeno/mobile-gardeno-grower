const defaultState = { selectedDayOfWeek: undefined, selectedDate: undefined };

import {
  SELECTED_DAY_OF_WEEK,
  GO_TO_DATE,
} from '../types/Authenticated/time'

export default function home(state = defaultState, action) {
  switch (action.type) {
    case SELECTED_DAY_OF_WEEK:
      return Object.assign({}, state, {
        selectedDayOfWeek: action.dayOfWeek,
      });
    case GO_TO_DATE:
      return Object.assign({}, state, {
        selectedDayOfWeek: action.dayOfWeek,
        selectedDate: action.date,
      });
    default:
      return state;
  }
}