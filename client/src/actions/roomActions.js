import axios from 'axios';

export const createNewRoom = (roomName, token) => {
	return async dispatch => {

		dispatch({
			type: "CREATE_ROOM_BEGIN"
		});

		if(roomName.length > 1) {
			try {	

				const response = await axios.post("/api/room/create", {
					roomName: roomName
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

export const joinToRoom = (rid, token) => {
	return dispatch => {

	};
};