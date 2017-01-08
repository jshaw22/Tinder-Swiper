import { AUTH_USER, 
	UNAUTH_USER,
	LOADING_STATUS, 
	AUTH_ERROR, 
	FETCH_MESSAGE, 
	AUTH_SUCCESS, 
	GET_RECOMMENDATIONS,
	LIKE_MATCH,
	NAME_RECEIVED } from '../actions/types';
import _ from "lodash";

//todo set up initial state 
const initialState = {
	userInfo: '',
	loggedIn: false,

}


export default function (state = {}, action){
	switch(action.type) {
		case AUTH_SUCCESS:
			return {...state, userInfo: action.payload, loggedIn: true, loadingStatus:'Logged in!'};
		case GET_RECOMMENDATIONS:
			console.log("Get Recommendations hit");
			return {...state, recs: action.payload.data };
		case LOADING_STATUS: 
			return{...state, loadingStatus: "Logging in..."}	
		case AUTH_ERROR:
			return{ ...state, error: action.payload };
		case LIKE_MATCH: 
			return {...state, likedBack: action.payload.match}
		case FETCH_MESSAGE:
			return {...state, message: action.payload};

	}

	return state;
}