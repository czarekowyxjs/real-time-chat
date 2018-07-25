class Chat {
	constructor(io, socket, db) {
		this.io = io;
		this.socket = socket;
		this.db = db;

		this.initHandlers();
	}

	initHandlers() {
		this.handleJoinToRoom();
		this.handleMessage();
		this.handleLeaveRoom();
	}

	handleJoinToRoom() {
		this.socket.on("joinToRoom", data => {
			this.db.RoomUserOnline
			.create({
				uid: data.user.uid,
				rid: data.rid,
				socket: this.socket.id
			})
			.then(resCreatedOnlineUser => {
				this.db.RoomUserOnline
				.findAll({
					where: { rid: data.rid },
					order: [['_createdAt', 'DESC']],
					include: [{
						model: this.db.User,
						attributes: ['uid', 'username', 'avatar']
					}]
				})
				.then(resAllOnlineUsers => {
					this.socket.join(data.rid);
					this.io.to(data.rid).emit("updateUsersList", {
						users: resAllOnlineUsers
					});
				})
				.catch(err => {
					console.log(err);
				});
			})
			.catch(err => {
				console.log(err);
			});
		});
	}

	handleMessage() {
		this.socket.on("sendMessage", data => {
			if(data.message.length > 0 && data.message.length < 999) {
				this.db.RoomMessage
				.create({
					rid: data.rid,
					uid: data.uid,
					content: data.message
				})
				.then(resCreatedMessage => {
					if(resCreatedMessage) {
						this.io.to(data.rid).emit("newMessage", {
							message: resCreatedMessage
						});
					}
				})
				.catch(err => {
					console.log(err);
				});
			}			
		});
	}

	handleLeaveRoom() {
		this.socket.on("disconnect", () => {
			this.db.RoomUserOnline
			.findOne({
				where: { socket: this.socket.id }
			})
			.then(resOnlineUser => {
				if(resOnlineUser) {
					this.db.RoomUserOnline
					.destroy({
						where: { socket: this.socket.id }
					})
					.then(resRoomUserOnline => {
						this.db.RoomUserOnline
						.findAll({
							where: { rid: resOnlineUser.rid },
							order: [['_createdAt', 'DESC']],
							include: [{
								model: this.db.User,
								attributes: ['uid', 'username', "avatar"]
							}]
						})
						.then(resRoomUserOnlineAll => {
							this.socket.leave(resOnlineUser.rid);
							this.io.to(resOnlineUser.rid).emit("updateUsersList", {
								users: resRoomUserOnlineAll
							});
						})
						.catch(err => {
							console.log(err);
						});
					})
					.catch(err => {
						console.log(err);
					});				
				}
			})
			.catch(err => {
				console.log(err);
			});
		});		
	}
}

export default Chat;