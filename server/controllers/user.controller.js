import { Router } from 'express';
import { Op } from 'sequelize';
import fs from 'fs';
import mkdirp from 'mkdirp';
import CustomError from '../helpers/CustomError';
import db from '../models';
import verifyToken from '../middlewares/verifyToken';

const router = new Router();

router.route('/avatar')
.post(verifyToken, (req, res) => {
	const file = req.body.file;
	const uid = req.locals.uid;

	req.checkBody('file').isImage(file.name);
	const errors = req.validationErrors();

	// save file
	const URI = file.URI;
	const matches = URI.match(/^data:.+\/(.+);base64,(.*)$/);
	const ext = matches[1];
	const data_base64 = matches[2];
	const buffer = new Buffer(data_base64, 'base64');
	const newFileName = Math.floor(new Date().getTime())+'.'+ext;
	const path = "./users/"+uid+"/images/"+newFileName;

	fs.writeFile(path, buffer, err => {
		if(err) {
			const error = new CustomError(500, "Server error, please try again", req);
			res.status(500).send({
				error
			});	
		} else {

			db.User.update({
				avatar: newFileName
			}, {
				where: { uid: uid	}
			})
			.then(resEditUser => {
				res.status(200).send({
					error: false,
					avatar: newFileName
				});
			})
			.catch(errEditUser => {
				const error = new CustomError(500, "Server error, please try again", req);
				res.status(500).send({
					error
				});	
			});
		}
	});
});

export default router;