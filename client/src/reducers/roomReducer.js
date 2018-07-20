const initialState = {
	createLoaded: false,
	createError: {},
	tmpRid: null,
	verifyRoomLoaded: false,
	verifyRoomError: {},
	roomData: {},
	messages: [],
	usersOnlineList: []
};

export default (state = initialState, action) => {
	switch(action.type) {
		case "CREATE_ROOM_BEGIN":
			return {
				...state,
				createLoaded: false,
				createError: {},
				tmpRid: null
			};
		case "CREATED_ROOM":
			return {
				...state,
				createLoaded: true,
				tmpRid: action.rid
			};
		case "CREATE_ROOM_ERROR":
			return {
				...state,
				createLoaded: true,
				createError: action.error
			};
		case "VERIFY_ROOM_BEGIN":
			return {
				...state,
				verifyRoomLoaded: false,
				roomData: {},
				messages: [],
				usersOnlineList: []
			};
		case "VERIFY_ROOM":
			return {
				...state,
				verifyRoomLoaded: true,
				roomData: action.room
			};
		case "VERIFY_ROOM_ERROR":
			return {
				...state,
				verifyRoomLoaded: true,
				verifyRoomError: action.error
			};
		case "UPDATE_ONLINE_USERS_LIST":
			return {
				...state,
				usersOnlineList: action.onlineUsers
			}
		default:
			return state;
	}
};