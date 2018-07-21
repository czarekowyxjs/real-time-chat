const initialState = {
	createLoaded: false,
	createError: {},
	tmpRid: null,
	joinLoaded: false,
	joinError: {},
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
		case "JOIN_TO_ROOM_BEGIN":
			return {
				...state,
				joinLoaded: false,
				joinError: {}
			}
		case "JOIN_TO_ROOM":
			return {
				...state,
				joinLoaded: true
			};
		case "JOIN_TO_ROOM_ERROR":
			return {
				...state,
				joinLoaded: true,
				joinError: action.error
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
			};
		case "PUSH_MESSAGE":
			return {
				...state,
				messages: action.messages
			};
		default:
			return state;
	}
};