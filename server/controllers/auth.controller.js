class AuthController {
	constructor(socket, db) {
		this.socket = socket;

		this.db = db;

		this.handleLoginReq();
		this.handleVerifyTokenReq();
	}

	handleLoginReq() {

		this.socket.on('login', user => {
			this.db.User
			.findOne({
				where: user,
				attributes: {
					exclude: ['password']
				}
			})
			.then(resUser => {

				if(resUser) {

					this.db.Token
					.create({
						uid: resUser.uid
					})
					.then(resToken => {

						this.socket.emit('loginSuccess', {
							user: resUser,
							token: resToken
						});

					})
					.catch(err => {
						this.socket.emit('loginError', {
							error: true,
							message: 'Server error, please try again'
						});
					});

				} else {
					this.socket.emit('loginError', {
						error: true,
						message: 'Invalid username or password'
					});
				}

			})
			.catch(err => {
				this.socket.emit('loginError', {
					error: true,
					message: 'Server error, please try again'
				});
			});
		});
	}

	handleVerifyTokenReq() {
		this.socket.on('verifyToken', data => {
			const reqToken = data.headers.Authorization;

			this.db.User
			.findOne({
				attributes: {
					exclude: ['password']
				},
				include: [{
					model: this.db.Token,
					where: {
						token: reqToken
					}
				}]
			})
			.then(resUser => {
				
				if(resUser) {
					this.socket.emit("verifyTokenSuccess", {
						user: resUser
					});
				} else {
					this.socket.emit("verifyTokenError", {
						error: true,
						message: "Invalid token"
					});
				}

			})
			.catch(err => {
				this.socket.emit("verifyTokenError", {
					error: true,
					message: 'Server error, please try again'
				})
			});

		});
	}
}

export default AuthController;