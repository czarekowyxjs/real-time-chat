import { Router } from 'express';
import CustomError from '../helpers/CustomError';
import db from '../models';
import verifyToken from '../middlewares/verifyToken';

const router = new Router();

router.route('/create')
.post(verifyToken, (req, res) => {
	
	const roomName = req.body.roomName;
	const uid = req.locals.uid;

	db.Room
	.create({
		admin_uid: uid,
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
});

router.route("/verify")
.get(verifyToken, (req, res) => {

	const uid = req.locals.uid;
	const rid = req.query.rid;

	db.Room
	.findOne({
		where: {
			rid: rid
		},
		include: {
			model: db.RoomUser,
			where: {
				rid: rid,
				uid: uid
			}
		}
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

});

export default router;