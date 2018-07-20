import Sequelize from 'sequelize';
import db from '../config/db.conf';

const RoomUserOnline = db.define('RoomUserOnline', {
	id: {
		type: Sequelize.BIGINT,
		unique: true,
		primaryKey: true,
		autoIncrement: true,
		field: 'id'
	},
	rid: {
		type: Sequelize.BIGINT,
		field: 'rid'
	},
	uid: {
		type: Sequelize.STRING(99),
		field: 'uid'
	},
	socket: {
		type: Sequelize.STRING(999),
		unique: true,
		field: 'socket'
	},
	_createdAt: {
		type: Sequelize.STRING(99),
		field: '_createdAt'
	}
}, {
	hooks: {
		beforeCreate: (roomUserOnline, options) => {
			return roomUserOnline._createdAt = Math.floor(new Date().getTime()/1000);
		}
	},
	tableName: 'room_user_online',
	timestamps: false
});

export default RoomUserOnline;