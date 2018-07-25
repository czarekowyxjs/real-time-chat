import axios from 'axios';

export const changeAvatar = (file, token) => {
	return async dispatch => {
		if(file.size < 100000) {
			try {
				const response = await axios.post("/api/user/avatar", {
					file: file
				}, {
					headers: {
						'Content-Type': 'application/json', 
						'authorization': token
					}
				});

				dispatch({
					type: "CHANGE_AVATAR",
					avatar: response.data.avatar
				});

			} catch(e) {	
				dispatch({
					type: "CHANGE_AVATAR_ERROR",
					error: e.response.data.error
				});
			}
		}
	};
};

export const updateRoomsList = (rooms) => {
	return dispatch => dispatch({
		type: "UPDATE_USER_ROOMS_LIST",
		rooms: rooms
	});
};