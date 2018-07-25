import axios from 'axios';

export const createNewRoom = (roomName, password, passwordAgain, token) => {
	return async dispatch => {

		dispatch({
			type: "CREATE_ROOM_BEGIN"
		});

		try {	

			const response = await axios.post("/api/room/create", {
				roomName: roomName,
				password: password,
				passwordAgain: passwordAgain
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

				let roomData = response.data.room;
				let messages = response.data.room.RoomMessages;
				let usersAllList = response.data.room.RoomUsers;

				delete roomData['RoomMessages'];
				delete roomData['RoomUsers'];

				dispatch({
					type: "VERIFY_ROOM",
					room: roomData,
					messages: messages,
					usersAllList: usersAllList
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

			await axios.post("/api/room/join", {
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

export const getAllMessages = (messagesPage, newMessages, rid, token) => {
	return async dispatch => {
		
		dispatch({
			type: "GET_ALL_MESSAGES_LOAD"
		});

		try {

			const response = await axios.get("/api/message/all?p="+messagesPage+"&rid="+rid+"&new="+newMessages, {
				headers: {
					'Content-Type': 'application/json', 
					'authorization': token
				}
			});

			let messages = response.data.messages;
			const newPage = messagesPage+1;

			messages.reverse();

			dispatch({
				type: "GET_ALL_MESSAGES",
				messagesPage: newPage,
				messages: messages
			});

		} catch(e) {
			console.log(e);
		}
	};
};

export const returnToDefaultMessages = () => {
	return dispatch => {
		dispatch({
			type: "GET_ALL_MESSAGES_BEGIN"
		});
	};
}

export const activeCLIMode = () => {
	return dispatch => dispatch({
		type: "ACTIVE_CLI"
	});
};

export const disableCLIMode = () => {
	return dispatch => dispatch({
		type: "DISABLE_CLI"
	});
};

export const executeCLICommand = (command, rid, token) => {
	return async dispatch => {
		try {
			const response = await axios.post("/api/room/cli", {
				command: command,
				rid: rid
			}, {
				headers: {
					'Content-Type': 'application/json', 
					'authorization': token
				}
			});

			let message;

			if(response.status === 202) {

				message = {
					mid: Math.floor(new Date().getTime()),
					uid: 'cli',
					rid: rid,
					content: response.data.error.message
				};

				dispatch({
					type: "RES_CLI_ERR",
					message: message
				});

			} else if(response.status === 200) {

				message = {
					mid: Math.floor(new Date().getTime()),
					uid: 'cli',
					rid: rid,
					content: response.data.message
				};

				dispatch({
					type: "RES_CLI",
					message: message
				});
			}

		} catch(e) {
			console.log(e.response);
		}
	};
};

export const returnAddedCLI = () => {
	return dispatch => dispatch({
		type: "RETURN_CLI"
	});
};