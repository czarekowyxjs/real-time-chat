import Sequelize from 'sequelize';
import db from '../config/db.conf';

const User = db.define('User', {
	uid: {
		type: Sequelize.BIGINT,
		unique: true,
		autoIncrement: true,
		primaryKey: true,
		field: 'uid'
	},
	username: {
		type: Sequelize.STRING(24),
		unique: true,
		field: 'username'
	},
	email: {
		type: Sequelize.STRING(255),
		unique: true,
		field: 'email'
	},
	password: {
		type: Sequelize.STRING(999),
		field: 'password'
	},
	avatar: {
		type: Sequelize.STRING(255),
		field: 'avatar'
	},
	_createdAt: {
		type: Sequelize.STRING(99),
		field: '_createdAt'
	}
}, {
	hooks: {
		beforeCreate: (user, options) => {
			return user._createdAt = Math.floor(new Date().getTime()/1000);
		}
	},
	tableName: 'users',
	timestamps: false
});

export default User;