import {
  SET_WEEK_PAGE_BY_INDEX,
  SELECTED_DATE,
  SET_DAY_PAGE_BY_INDEX,
} from '../types/Authenticated/time'

import { getRandomQuote } from '../shared/quotes';

import Moment from 'moment';
import { extendMoment } from 'moment-range';

const moment = extendMoment(Moment);
const DATE_FORMAT = 'YYYY-MM-DD';

const rightNow = moment();
const weekStart = rightNow.clone().startOf('isoWeek');

const defaultState = {
  selectedDate: rightNow.clone().format(DATE_FORMAT),
  weekPages: [
    weekStart.format(DATE_FORMAT),
    weekStart.clone().add(7, 'days').format(DATE_FORMAT),
    weekStart.clone().add(-7, 'days').format(DATE_FORMAT),
  ],
  dayPageData: {
    '2018-09-05': {
      hours: '4:00',
    },
    '2018-09-06': {
      hours: '3:30',
    },
  },
  dayPageQuotes: [
    getRandomQuote(),
    getRandomQuote(),
    getRandomQuote(),
  ],
  dayPages: [
    rightNow.clone().format(DATE_FORMAT),
    rightNow.clone().add(1, 'days').format(DATE_FORMAT),
    rightNow.clone().add(-1, 'days').format(DATE_FORMAT),
  ]
};

export default function home(state = defaultState, action) {
  switch (action.type) {
    case SELECTED_DATE:
      return Object.assign({}, state, {
        selectedDate: action.newDate,
      });
    case SET_WEEK_PAGE_BY_INDEX:
      return Object.assign({}, state, {
        weekPages: state.weekPages.map((existingWeekPage, existingIndex) => {
          if (existingIndex === action.index) {
            return action.page;
          }
          return existingWeekPage;
        }),
      });
    case SET_DAY_PAGE_BY_INDEX:
      const dayPageQuotes = state.dayPageQuotes.slice();
      const dayPages = state.dayPages.map((existingDayPage, existingIndex) => {
        if (existingIndex === action.index) {
          dayPageQuotes[action.index] = getRandomQuote();
          return action.page;
        }
        return existingDayPage;
      });
      return Object.assign({}, state, {
        dayPages: dayPages,
        dayPageQuotes: dayPageQuotes,
      });
    default:
      return state;
  }
}