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
	hash: {
		type: Sequelize.STRING(99),
		unique: true,
		field: 'hash'
	},
	admin_uid: {
		type: Sequelize.BIGINT,
		field: "admin_uid"
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
			const now = (new Date()).valueOf().toString();
			const rand = Math.random().toString();
			const hash = crypto.createHash('sha1').update(now + rand).digest('hex');
			room.hash = hash;
			return room;
		}
	},
	tableName: 'rooms',
	timestamps: false
});

export default Room;