import { Router } from 'express';
import CustomError from '../helpers/CustomError';
import db from '../models';

const router = new Router();

router.route('/login')
.get((req, res) => {
	const username = req.body.user.username;
	const password = req.body.user.password;

	db.User
	.findOne({
		attributes: {
			exclude: ['password']
		},
		where: {
			username: username,
			password: password
		}
	})
	.then(resUser => {

		if(resUser) {

			db.Token
			.create({
				uid: resUser.uid
			})
			.then(resToken => {
				res.status(200);
				res.send({
					user: resUser,
					token: resToken
				});					
			})
			.catch(err => {
				const error = new CustomError(500, "Invalid username or password", req);
				res.status(500);
				res.send({
					error
				});
			});

		} else {
			const error = new CustomError(404, "Invalid username or password", req);
			res.status(404);
			res.send({
				error
			});
		}

	})
	.catch(err => {
		const error = new CustomError(500, "Server error, please try again", req);
		res.status(500);
		res.send({
			error
		});
	});
});

router.route("/logout")
.post((req, res) => {
	const token = req.body.token;

	db.Token
	.destroy({
		where: {
			token: token
		}
	})
	.then(resToken => {
		res.status(202);
		res.send({
			error: false
		});
	})
	.catch(err => {

	});
});

router.route("/authorization")
.get((req, res) => {
	const token = req.query.t;

	db.User
	.findOne({
		attributes: {
			exclude: ['password']
		},
		include: [{
			model: db.Token,
			where: {
				token: token
			}
		}]
	})
	.then(resUser => {

		if(resUser) {

			res.status(200);
			res.send({
				user: resUser
			});

		} else {
			const error = new CustomError(203, "Peromission denied", req);
			res.status(203);
			res.send({
				error: error
			});				
		}

	})
	.catch(err => {
		const error = new CustomError(500, "Server error, please try again", req);
		res.status(500);
		res.send({
			error: error
		});
	});
});

export default router;