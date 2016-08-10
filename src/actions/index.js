import axios from 'axios';
import { browserHistory } from 'react-router';
import { AUTH_USER, AUTH_ERROR, UNAUTH_USER, FETCH_MESSAGE } from './types';

const API_URL = 'http://localhost:3000';

export function signinUser({userName, password}){
	//dispatch can handle many different functions 
	return function (dispatch) {
	//submit email/password to server
	axios.post(`${API_URL}/signin`, {userName: userName, password: password})
		.then(response => {
		  //if request is good..
			// 1.) update state to indicate user is authed. 
			dispatch( { type: AUTH_USER } );
			// 2.) save JWT token to local storage
			localStorage.setItem('token', response.data.token);
			// 3.) redirect to route /feature
			browserHistory.push('/welcome');

		})
		.catch((e) => {
			// if request is bad..
	  	//show error to user 
	  	console.log("Something bad from the server", e)
			dispatch(authError("Bad Login Info"));
		})
				
	}

}

export function signupUser ({userName, password}) {
	return function (dispatch) {
		axios.post(`${API_URL}/signup`, {userName, password}).then(response => {
			dispatch({type: AUTH_USER});
			localStorage.setItem('token', response.data.token);
			browserHistory.push('/userinfo')
		})
		.catch(response => dispatch(authError(response.data.error)));
	}
}


export function authError(error) {
	return { 
		type: AUTH_ERROR,
		payload: error
	}
}

export function signoutUser () {
	localStorage.removeItem('token');
	return {
		type: UNAUTH_USER 
	}
}

export function fetchMessage () {
	return function(dispatch){
		axios.get(API_URL, {
			headers: {authorization: localStorage.getItem("token")}
		})
		.then(response => {
			dispatch({
				type: FETCH_MESSAGE,
				payload: response.data.message
			})
		})
	}
}