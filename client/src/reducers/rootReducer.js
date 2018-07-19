import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import authReducer from './authReducer';
import logoutReducer from './logoutReducer';
import userReducer from './userReducer';

export default combineReducers({
	login: loginReducer,
	auth: authReducer,
	logout: logoutReducer,
	user: userReducer
});