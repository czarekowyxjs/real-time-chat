import { Router } from 'express';
import CustomError from '../helpers/CustomError';
import db from '../models';
import verifyToken from '../middlewares/verifyToken';

const router = new Router();

router.route("/all")
.get(verifyToken, (req, res) => {
	const page = req.query.p;
	const rid = req.query.rid;
	const newMessages = req.query.new;
	const limit = 40;
	const offset = (page*limit)+parseInt(newMessages);

	db.RoomMessage
	.findAll({
		where: {
			rid: rid
		},
		order: [
			['_createdAt', 'DESC']
		],
		limit: limit,
		offset: offset
	})
	.then(resRoomMessages => {
		res.status(200).send({
			messages: resRoomMessages
		});
	})
	.catch(err => {
		res.status(404).send(err);
	});
});

export default router;