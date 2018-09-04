import {
  SELECTED_DATE,
  SET_WEEK_PAGE_BY_INDEX,
  SET_DAY_PAGE_BY_INDEX,
} from '../types/Authenticated/time'

export const setSelectedDate = (newDate) => {
  return {
    type: SELECTED_DATE,
    newDate,
  }
};

export const setWeekPageByIndex = (index, weekPage) => {
  return {
    type: SET_WEEK_PAGE_BY_INDEX,
    index: index,
    page: weekPage,
  }
}

export const setDayPageByIndex = (index, dayPage) => {
  return {
    type: SET_DAY_PAGE_BY_INDEX,
    index: index,
    page: dayPage,
  }
};
