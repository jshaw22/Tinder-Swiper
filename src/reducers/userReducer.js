import { AUTH_USER, 
	UNAUTH_USER, 
	AUTH_ERROR, 
	FETCH_MESSAGE, 
	AUTH_SUCCESS, 
	GET_RECOMMENDATIONS,
	NAME_RECEIVED } from '../actions/types';

export default function (state = {}, action){
	switch(action.type) {
		case AUTH_SUCCESS:
			console.log("Auth success reducer hit")
			console.log(action.payload)
			return {userInfo: action.payload, loggedIn: true};
		case GET_RECOMMENDATIONS:
			console.log("Get Recommendations hit")
			return {recs: action.payload };
		case AUTH_ERROR:
			return{ ...state, error: action.payload };
		case FETCH_MESSAGE:
			return {...state, message: action.payload};

	}

	return state;
}