import { Router } from 'express';
import CustomError from '../helpers/CustomError';
import db from '../models';
import verifyToken from '../middlewares/verifyToken';

const router = new Router();

router.route("/group/send")
.post(verifyToken, (req, res) => {
	console.log(req.body);
});

export default router;