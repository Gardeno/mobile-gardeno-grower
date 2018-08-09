import uuid from 'uuid';

import {
  ADD_ALERT,
  DISMISS_ALERT,
} from '../types/alerts'

export const dismissAlertById = (id) => ({
  type: DISMISS_ALERT,
  id,
});

export const addAlert = ({ message, messageType='error', hideDelayMs=1000 }) => {
  //messageType must be 'error' or 'success' right now
  return (dispatch) => {
    const messageId = uuid.v1();
    setTimeout(() => {
      dispatch(dismissAlertById(messageId));
    }, hideDelayMs);
    dispatch({
      type: ADD_ALERT,
      id: messageId,
      message,
      messageType,
    });
  }
};
