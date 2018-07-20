import Sequelize from 'sequelize';
import db from '../config/db.conf';

const Room = db.define('Room', {
	rid: {
		type: Sequelize.BIGINT,
		unique: true,
		autoIncrement: true,
		primaryKey: true,
		field: 'rid'
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
			return room._createdAt = Math.floor(new Date().getTime()/1000);
		}
	},
	tableName: 'rooms',
	timestamps: false
});

export default Room;