import axios from 'axios';

import { 
	AUTH_USER, 
	AUTH_ERROR,
	LOADING_STATUS,
	LIKE_MATCH,
	UNAUTH_USER, 
	FETCH_MESSAGE, 
	AUTH_SUCCESS, 
	GET_RECOMMENDATIONS, 
	NAME_RECEIVED } from './types';

axios.defaults.baseURL = 'http://localhost:3000';


var accessToken, userID, userName;


// This is for facebook login
 function statusChangeCallback(response) {
    console.log('statusChangeCallback');
    console.log(response);
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status === 'connected') {
    	accessToken = response.authResponse.accessToken;
    	userID = response.authResponse.userID;

      // Logged into your app and Facebook.
      	FB.api('/me', function(response) {
      	console.dir('Successful login for: ' + response.name);
      	userName = response.name;   
    });
    } else if (response.status === 'not_authorized') {
      // The person is logged into Facebook, but not your app.
    } else {
      // The person is not logged into Facebook, so we're not sure if
      // they are logged into this app or not.
     
    }
  }

  // This function is called when someone finishes with the Login
  // Button.  See the onlogin handler attached to it in the sample
  // code below.
  function checkLoginState() {
    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });
  }

  window.fbAsyncInit = function() {
  FB.init({
    appId      : '984102938292005',
    cookie     : true,  // enable cookies to allow the server to access 
                        // the session
    xfbml      : true,  // parse social plugins on this page
    version    : 'v2.5' // use graph api version 2.5
  });

  // Now that we've initialized the JavaScript SDK, we call 
  // FB.getLoginStatus().  This function gets the state of the
  // person visiting this page and can return one of three states to
  // the callback you provide.  They can be:
  //
  // 1. Logged into your app ('connected')
  // 2. Logged into Facebook, but not your app ('not_authorized')
  // 3. Not logged into Facebook and can't tell if they are logged into
  //    your app or not.
  //
  // These three cases are handled in the callback function.

  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });

  };

  // Load the SDK asynchronously
  (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));

 

export function login() {
	return function(dispatch){
		dispatch({
		type: LOADING_STATUS
		});
		console.log("sending off the accessToken", accessToken)
		axios.post('/matches', {accessToken: accessToken, userID: userID, userName: userName})
		.then (response => {
		console.log("response", response)
		dispatch({
			type: AUTH_SUCCESS,
			payload: { accessToken, userID, userName }
			});
		dispatch(getMatches(response));
		});
	}
}

function getMatches (data) {
	return ({
		type: GET_RECOMMENDATIONS,
		payload: data
	});
}


// export function likeMatch(id) {
// 	console.log("likematch called")
// 	console.log("match id", id);
// 	return function(dispatch) {
// 		axios.post('/likes', id)
// 		.then (response => {}
// 	}
// }


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

