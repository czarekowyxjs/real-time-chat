class User {
	constructor(io, socket, db) {
		this.io = io;
		this.socket = socket;
		this.db = db;

		this.initHandlers();
	}

	initHandlers() {
		this.handleGetAllRooms();
	}

	handleGetAllRooms() {
		this.socket.on("getAllRooms", data => {
			this.db.RoomUser
			.findAll({
				where: { uid: data.uid },
				group: ['rid'],
				include: [{
					model: this.db.Room
				}]
			})
			.then(resAllRooms => {
				this.socket.emit("allUserRooms", {
					rooms: resAllRooms
				});
			})
			.catch(err => {

			});
		});
	}
}

export default User;