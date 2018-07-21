import Sequelize from 'sequelize';
import crypto from 'crypto';
import db from '../config/db.conf';

const Room = db.define('Room', {
	rid: {
		type: Sequelize.BIGINT,
		unique: true,
		primaryKey: true,
		autoIncrement: true,
		field: 'rid'
	},
	admin_uid: {
		type: Sequelize.BIGINT,
		field: "admin_uid"
	},
	password: {
		type: Sequelize.STRING(999),
		required: true,
		field: 'password'
	},
	room_name: {
		type: Sequelize.STRING(99),
		unique: true,
		field: 'room_name'
	},
	_createdAt: {
		type: Sequelize.STRING(99),
		field: '_createdAt'
	}
}, {
	hooks: {
		beforeCreate: (room, options) => {
			room._createdAt = Math.floor(new Date().getTime()/1000);
			return room;
		}
	},
	tableName: 'rooms',
	timestamps: false
});

export default Room;