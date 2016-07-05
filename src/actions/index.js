import axios from 'axios';
import { browserHistory } from 'react-router';
import { AUTH_USER, AUTH_ERROR, UNAUTH_USER } from './types';

const API_URL = 'http://localhost:3000';

export function signinUser({email, password}){
	//dispatch can handle many different functions 
	return function (dispatch) {
	//submit email/password to server
	axios.post(`${API_URL}/signin`, {email: email, password: password})
		.then(response => {
		  //if request is good..
			// 1.) update state to indicate user is authed. 
			dispatch( { type: AUTH_USER } );
			// 2.) save JWT token to local storage
			localStorage.setItem('token', response.data.token);
			// 3.) redirect to route /feature
			browserHistory.push('/feature');

		})
		.catch((e) => {
			// if request is bad..
	  	//show error to user 
	  	console.log("Something bad from the server", e)
			dispatch(authError("Bad Login Info"));
		})
				
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