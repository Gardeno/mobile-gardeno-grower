import { API_URL } from '../config';
import { addAlert } from './alerts';

const _handleResponse = (dispatch) => {
  return (response) => {
    const json = response.json();
    if (response.ok) {
      return json;
    } else if (response.status === 401) {
      // dispatch(logoutUser());
    } else if (response.status === 403) {
      throw { error: 'You are not authorized to perform this action' }
    } else if (response.status === 404) {
      throw { error: 'Not found (404)' }
    } else if (response.status === 500) {
      throw { error: 'An internal error has occurred' }
    }
    return json.then(err => {
      console.warn(err);
      throw err;
    });
  }
};

const _handleError = (dispatch, callback, failSilently) => {
  return (response) => {
    let errorMessage = 'An unknown error has occurred';
    if (response && response.error && typeof (response.error) === 'string') {
      errorMessage = response.error;
    }
    callback(errorMessage);
    if (!failSilently) {
      dispatch(addAlert({ message: errorMessage }));
    }
    console.warn(response);
    return errorMessage;
  }
};

export const postToApi = ({ url, body, dispatch, getState, failSilently=false }, callback) => {
  let options = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  };
  if (getState) {
    options.headers.Authorization = 'Bearer ' + getState().auth.authToken;
  }
  return fetch(`${API_URL}${url}`, options)
    .then(_handleResponse(dispatch))
    .then((response) => {
      return callback(null, response);
    })
    .catch(_handleError(dispatch, callback, failSilently));
};

export const getFromApi = ({ url, dispatch, getState }, callback) => {
  const options = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }
  };
  if (getState) {
    options.headers.Authorization = 'Bearer ' + getState().auth.authToken;
  }
  return fetch(`${API_URL}${url}`, options)
    .then(_handleResponse(dispatch))
    .then((response) => {
      return callback(null, response);
    })
    .catch(_handleError(dispatch, callback));
};

export const deleteFromApi = ({ url, dispatch, getState }, callback) => {
  const options = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + getState().auth.authToken,
    }
  };
  //Instead of using a DELETE method we're adding on a delete url, cause of .NET
  fetch(`${API_URL}${url}/delete`, options)
    .then(_handleResponse(dispatch))
    .then((response) => {
      callback(null, response);
    })
    .catch(_handleError(dispatch, callback));
};
