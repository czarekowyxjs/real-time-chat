import axios from 'axios';

export const createNewRoom = (roomName, password, token) => {
	return async dispatch => {

		dispatch({
			type: "CREATE_ROOM_BEGIN"
		});

		if(roomName.length > 1) {
			try {	

				const response = await axios.post("/api/room/create", {
					roomName: roomName,
					password: password
				}, {
					headers: {
						'Content-Type': 'application/json', 
						'authorization': token
					}
				});

				dispatch({
					type: "CREATED_ROOM",
					rid: response.data.rid
				});

			} catch(e) {
				console.log(e.response);
				dispatch({
					type: "CREATE_ROOM_ERROR",
					error: e.response.data.error
				});
			}

		} 
	};
};

export const returnToDefaultCreateRoom = () => {
	return dispatch => dispatch({
		type: "CREATE_ROOM_BEGIN"
	});
};

export const verifyRoom = (rid, token) => {
	return async dispatch => {
		dispatch({
			type: "VERIFY_ROOM_BEGIN"
		});

		try {

			const response = await axios.get("/api/room/verify?rid="+rid, {
				headers: {
					'Content-Type': 'application/json', 
					'authorization': token
				}
			});

			if(response.status === 202) {
				dispatch({
					type: "VERIFY_ROOM_ERROR",
					error: response.data.error
				});				
			} else if(response.status === 200) {
				dispatch({
					type: "VERIFY_ROOM",
					room: response.data.room
				});
			}

		} catch(e) {
			dispatch({
				type: "VERIFY_ROOM_ERROR",
				error: e.response.data.error
			});
		}
	};
};

export const returnToDefaultVerifyRoom = () => {
	return dispatch => dispatch({
		type: "VERIFY_ROOM_BEGIN"
	});
};

export const updateOnlineUsersList = users => {
	return dispatch => {
		dispatch({
			type: "UPDATE_ONLINE_USERS_LIST",
			onlineUsers: users
		});
	};
};

export const joinToRoom = (rid, password, token) => {
	return async dispatch => {

		dispatch({
			type: "JOIN_TO_ROOM_BEGIN"
		});

		try {

			const response = await axios.post("/api/room/join", {
				rid: rid,
				password: password
			}, {
				headers: {
					'Content-Type': 'application/json', 
					'authorization': token
				}
			});

			dispatch({
				type: "JOIN_TO_ROOM"
			});

		} catch(e) {
			dispatch({
				type: "JOIN_TO_ROOM_ERROR",
				error: e.response.data.error
			});
		}
	};
};

export const returnToDefaultJoin = () => {
	return dispatch => dispatch({
		type: "JOIN_TO_ROOM_BEGIN"
	});
};

export const pushMessage = (messages, message) => {
	return dispatch => {

		let newMessages = messages;

		newMessages.push(message);

		dispatch({
			type: "PUSH_MESSAGE",
			messages: messages
		});
	};
};