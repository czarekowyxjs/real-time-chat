import Sequelize from 'sequelize';
import db from '../config/db.conf';

const RoomUser = db.define('RoomUser', {
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
	_createdAt: {
		type: Sequelize.STRING(99),
		field: '_createdAt'
	}
}, {
	hooks: {
		beforeCreate: (roomUser, options) => {
			return roomUser._createdAt = Math.floor(new Date().getTime()/1000);
		}
	},
	tableName: 'room_user',
	timestamps: false
});

export default RoomUser;