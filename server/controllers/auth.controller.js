import { Router } from 'express';
import { Op } from 'sequelize';
import mkdirp from 'mkdirp';
import CustomError from '../helpers/CustomError';
import db from '../models';

const router = new Router();

router.route('/login')
.post((req, res) => {
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

			db.Token.findOne({
				where: {
					uid: resUser.uid
				}
			})
			.then(resCheckToken => {

				if(!resCheckToken) {
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
						const error = new CustomError(500, "Server error, please try again", req);
						res.status(500);
						res.send({
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
		res.status(500).send({
			error
		});
	});
});

router.route("/register")
.post((req, res) => {
	
	req.checkBody("username", "Invalid username").trim().isLength({ min: 2, max: 24});
	req.checkBody("email", "Invalid email address").trim().isEmail();
	req.checkBody("password", "Invalid password").trim().isLength({ min: 6, max: 999});
	req.checkBody("passwordAgain", "Invalid password again").equals(req.body.password);

	const errors = req.validationErrors();

	if(!errors) {

		db.User
		.findOne({
			where: {
				[Op.or]: [{ username: req.body.username }, { email: req.body.email }]
			}
		})
		.then(resCheckUser => {
			if(resCheckUser) {

				const error = new CustomError(202, "Username is busy", req);
				res.status(202).send({
					error
				});

			} else {

				db.User
				.create({
					username: req.body.username,
					email: req.body.email,
					password: req.body.password
				})
				.then(resCreateUser => {
					const uid = resCreateUser.uid;

					mkdirp('./users/'+uid+'/images');

					res.status(200).send({
						error: false,
						user: resCreateUser
					});

				})
				.catch(err => {
					const error = new CustomError(500, "Server error, please try again", req);
					res.status(500).send({
						error: error
					});
				});

			}
		})
		.catch(err => {
			const error = new CustomError(500, "Server error, please try again", req);
			res.status(500).send({
				error: error
			});
		});

	} else {
		const error = new CustomError(202, "Invalid data", req);
		res.status(202).send({
			errors,
			error
		});
	}

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
		res.status(500).send({
			error: error
		});
	});
});

export default router;