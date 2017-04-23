import axios from 'axios';
import { browserHistory } from 'react-router';
import { AUTH_USER, UNAUTH_USER, AUTH_ERROR, FETCH_DATA } from './types';

const ROOT_URL = 'http://localhost:3080';

export function signinUser({ email, password}){
  return function(dispatch){
    axios.post(`${ROOT_URL}/signin`, {email, password})
      .then(response => {
        dispatch({type: AUTH_USER});

        localStorage.setItem('token', response.data.token);

        browserHistory.push('/feature');
      })
      .catch(() => {
        dispatch(authError('Bad Login Info'));
      });
  };
}

export function signupUser({ email, password}){
  return function(dispatch){
    axios.post(`${ROOT_URL}/signup`, {email, password})
      .then(response => {
        dispatch({type: AUTH_USER});

        localStorage.setItem('token', response.data.token);

        browserHistory.push('/feature');
      })
      .catch(response => dispatch(authError(response.response.data.error)) );
  };
}

export function signoutUser(){
  localStorage.removeItem('token');

  return {type: UNAUTH_USER};
}

export function authError(error){
  return {
    type: AUTH_ERROR,
    payload: error
  }
}

export function getMessageFromAPI(){
  return function(dispatch){
    axios.get(ROOT_URL, {
      headers: { authorization: localStorage.getItem('token')}
    })
      .then(response => {
        dispatch({
          type: FETCH_DATA,
          payload: response.data.message
        });
      })
      .catch(response => dispatch(authError(response.response.data.error)) );
  };
}
