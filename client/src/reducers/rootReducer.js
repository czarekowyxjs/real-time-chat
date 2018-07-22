import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import registerReducer from './registerReducer';
import authReducer from './authReducer';
import logoutReducer from './logoutReducer';
import userReducer from './userReducer';
import roomReducer from './roomReducer';

export default combineReducers({
	login: loginReducer,
	register: registerReducer,
	auth: authReducer,
	logout: logoutReducer,
	user: userReducer,
	room: roomReducer
});