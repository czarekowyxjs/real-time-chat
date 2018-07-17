import Sequelize from 'sequelize';
import db from '../config/db.conf';

const Token = db.define('Token', {
	tid: {
		type: Sequelize.BIGINT,
		unique: true,
		autoIncrement: true,
		primaryKey: true,
		field: 'tid'
	},
	uid: {
		type: Sequelize.BIGINT,
		field: 'uid'
	},
	token: {
		type: Sequelize.STRING(255),
		unique: true,
		field: 'token'
	},
	_createdAt: {
		type: Sequelize.STRING(99),
		field: '_createdAt'
	}
}, {
	hooks: {
		beforeCreate: (token, options) => {
			token._createdAt = Math.floor(new Date().getTime()/1000);
			token.token = Math.random()*10;
			return token;
		}
	},
	tableName: 'tokens',
	timestamps: false
});

export default Token;