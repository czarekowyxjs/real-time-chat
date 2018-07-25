import { Router } from 'express';
import CustomError from '../helpers/CustomError';
import db from '../models';
import verifyToken from '../middlewares/verifyToken';

const router = new Router();

router.route('/create')
.post(verifyToken, (req, res) => {
	
	const roomName = req.body.roomName;
	const password = req.body.password;
	const uid = req.locals.uid;

	req.checkBody("roomName", "Invalid room name").trim().isLength({ min: 2, max: 99 });
	req.checkBody("password", "Invalid password").trim().isLength({ min: 6, max: 999 });
	req.checkBody("passwordAgain", "Invalid password again").equals(req.body.password);

	const errors = req.validationErrors();

	if(!errors) {
		db.Room
		.create({
			admin_uid: uid,
			password: password,
			room_name: roomName
		})
		.then(resRoom => {
			db.RoomUser
			.create({
				rid: resRoom.rid,
				uid: resRoom.admin_uid
			})
			.then(resRoomUser => {

				res.status(200).send({
					rid: resRoom.rid
				});

			})
			.catch(err => {
				const error = new CustomError(500, "Server error, please try again", req);
				res.status(500).send({
					error
				});			
			});

		})
		.catch(err => {
			const error = new CustomError(500, "Server error, please try again", req);
			res.status(500).send({
				error
			});
		});
	} else {

			const error = new CustomError(404, "Invalid room name or password", req);
			res.status(404).send({
				error,
				errors
			});			

	}
});

router.route("/verify")
.get(verifyToken, (req, res) => {

	const uid = req.locals.uid;
	const rid = req.query.rid;

	db.RoomBanned
	.findOne({
		where: { rid: rid, uid: uid }
	})
	.then(resBannedCheck => {
		if(resBannedCheck) {
			const error = new CustomError(202, "You are banned", req)
			res.status(202).send({
				error
			});				
		} else {
			db.RoomUser
			.findOne({
				where: { rid:rid, uid: uid }
			})
			.then(resRoomUserCheck => {

				if(resRoomUserCheck) {

					db.Room
					.findOne({
						where: {
							rid: rid
						},
						include: [{
							model: db.RoomUser,
							where: {
								rid: rid
							},
							include: [{
								model: db.User,
								attributes: ['uid', 'username', 'avatar']
							}]
						}, {
							model: db.RoomMessage
						}],
						order: [
							[db.RoomMessage, "_createdAt", "ASC"]
						]
					})
					.then(resRoom => {

						if(resRoom) {
							res.status(200).send({
								error: false,
								room: resRoom
							});
						} else {
							const error = new CustomError(202, "Room not found", req)
							res.status(202).send({
								error
							});
						}
					})
					.catch(err => {
						const error = new CustomError(500, "Server error, please try again", req);
						res.status(500).send({
							error
						});
					});
					
				} else {
					const error = new CustomError(202, "Room not found", req)
					res.status(202).send({
						error
					});			
				}

			})
			.catch(err => {
				const error = new CustomError(500, "Server error, please try again", req);
				res.status(500).send({
					error
				});
			});
		}
	})
	.catch(err => {
		const error = new CustomError(500, "Server error, please try again", req);
		res.status(500).send({
			error
		});
	});
});

router.route("/join")
.post(verifyToken, (req, res) => {
	const rid = req.body.rid;
	const password = req.body.password;
	const uid = req.locals.uid;

	db.RoomUser
	.findOne({
		where: { rid: rid, uid: uid }
	})
	.then(resRoomUser => {

		if(resRoomUser) {

			const error = new CustomError(202, "You already are in this room", req);
			res.status(202).send({
				error
			});			

		} else {

			db.Room
			.findOne({
				where: { rid: rid, password: password }
			})
			.then(resRoom => {

				if(resRoom) {

					db.RoomUser
					.create({ rid: rid, uid: uid })
					.then(resCreated => {

						res.status(200).send({
							error: false
						});

					})
					.catch(err => {
						const error = new CustomError(500, "Server error, please try again", req);
						res.status(500).send({
							error
						});
					});

				} else {
					const error = new CustomError(404, "Invalid room id or password", req);
					res.status(404).send({
						error
					});					
				}

			})
			.catch(err => {
				const error = new CustomError(500, "Server error, please try again", req);
				res.status(500).send({
					error
				});				
			})

		}

	})
	.catch(err => {
		const error = new CustomError(500, "Server error, please try again", req);
		res.status(500).send({
			error
		});
	});
});

router.route("/cli")
.post(verifyToken, (req, res) => {
	const uid = req.locals.uid;
	const rid = req.body.rid;
	const command = req.body.command;
	const passwordPattern = /^\/cli\s-p\s[A-Za-z0-9ąćęłńóśźżĄĘŁŃÓŚŹŻ]{6,999}\s[A-Za-z0-9ąćęłńóśźżĄĘŁŃÓŚŹŻ]{6,999}$/;
	const bannedPattern = /^\/cli\s-ban\s[A-Za-z0-9ąćęłńóśźżĄĘŁŃÓŚŹŻ]+$/;
	const unBannedPattern = /^\/cli\s-unban\s[A-Za-z0-9ąćęłńóśźżĄĘŁŃÓŚŹŻ]+$/;
	let split = [];

	db.Room
	.findOne({ where: { rid: rid, admin_uid: uid } })
	.then(resAdminRoom => {
		if(resAdminRoom) {
			if(passwordPattern.test(command)) {
				split = command.split(" ");

				if(split[2] === split[3]) {
					db.Room
					.update({
						password: split[2]
					}, {
						where: { rid: rid, admin_uid: uid }
					})
					.then(resUpdatedPassword => {
						res.status(200).send({
							error: false,
							message: "Password changed"
						});
					})
					.catch(err => {
						const error = new CustomError(500, "Server error, please try again", req);
						res.status(500).send({
							error,
							err
						});
					});
				} else {
					const error = new CustomError(202, "Password are not that same", req);
					res.status(202).send({
						error
					});			
				}
			} else if(bannedPattern.test(command)) {
				split = command.split(" ");
				const nickToBan = split[2];

				db.User
				.findOne({ where: { username: nickToBan } })
				.then(resUserToBan => {
					if(resUserToBan) {
						db.RoomBanned
						.create({
							rid: rid,
							uid: resUserToBan.uid,
							reason: 'empty'
						})
						.then(resBanned => {
							res.status(200).send({
								error: false,
								message: "User successfully banned"
							});
						})
						.catch(err => {
							const error = new CustomError(500, "Server error, please try again", req);
							res.status(500).send({
								error,
								err
							});
						});
					} else {
						const error = new CustomError(202, "User doesn't exist", req);
						res.status(202).send({
							error
						});								
					}
				})
				.catch(err => {
					const error = new CustomError(500, "Server error, please try again", req);
					res.status(500).send({
						error,
						err
					});
				});
			} else if(unBannedPattern.test(command)) {
				split = command.split(" ");
				const nickToUnBan = split[2];			

				db.User
				.findOne({ where: { username: nickToUnBan } })
				.then(resUserToUnBan => {
					if(resUserToUnBan) {
						db.RoomBanned
						.destroy({
							where: {
								rid: rid,
								uid: resUserToUnBan.uid
							}
						})
						.then(resUnBanned => {
							res.status(200).send({
								error: false,
								message: "User successfully unbanned"
							});
						})
						.catch(err => {
							const error = new CustomError(500, "Server error, please try again", req);
							res.status(500).send({
								error,
								err
							});
						});
					} else {
						const error = new CustomError(202, "User doesn't exist", req);
						res.status(202).send({
							error
						});								
					}
				})
				.catch(err => {
					const error = new CustomError(500, "Server error, please try again", req);
					res.status(500).send({
						error,
						err
					});
				});							
			}
		} else {
			const error = new CustomError(202, "You are not room admin", req);
			res.status(202).send({
				error
			});				
		}
	})
	.catch(err => {
		const error = new CustomError(500, "Server error, please try again", req);
		res.status(500).send({
			error,
			err
		});		
	});
});

export default router;