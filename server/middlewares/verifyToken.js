import db from '../models';
import CustomError from '../helpers/CustomError';

export default (req, res, next) => {

	const token = req.headers.authorization;
	db.Token
	.findOne({
		where: {
			token: token
		}
	})
	.then(resToken => {

		if(resToken) {

			req.locals = {
				uid: resToken.uid
			};

			next();

		} else {

			const error = new CustomError(404, "Invalid token", req);
			res.status(404).send({
				error
			});
		}

	})
	.catch(err => {
		const error = new CustomError(500, "Server error", req);
		res.status(500).send({
			error
		});
	});
};