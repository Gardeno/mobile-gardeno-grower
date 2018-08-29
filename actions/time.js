import {
  SELECTED_DAY_OF_WEEK,
  GO_TO_DATE,
} from '../types/Authenticated/time'


export const toggleDayOfWeek = (dayOfWeek) => {
  return {
    type: SELECTED_DAY_OF_WEEK,
    dayOfWeek,
  }
};

export const goToDate = (dateMoment) => {
  return {
    type: GO_TO_DATE,
    date: dateMoment.format('YYYY-MM-DD'),
    dayOfWeek: dateMoment.day(),
  }
};