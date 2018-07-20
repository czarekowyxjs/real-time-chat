import Sequelize from 'sequelize';
import db from '../config/db.conf';

const RoomMessage = db.define('RoomMessage', {
	mid: {
		type: Sequelize.BIGINT,
		unique: true,
		autoIncrement: true,
		primaryKey: true,
		field: 'mid'
	},
	uid: {
		type: Sequelize.BIGINT,
		field: "uid"
	},
	rid: {
		type: Sequelize.BIGINT,
		field: "rid"
	},
	content: {
		type: Sequelize.STRING(999),
		field: 'content'
	},
	_createdAt: {
		type: Sequelize.STRING(99),
		field: '_createdAt'
	}
}, {
	hooks: {
		beforeCreate: (roomMessage, options) => {
			return roomMessage._createdAt = Math.floor(new Date().getTime()/1000);
		}
	},
	tableName: 'room_messages',
	timestamps: false
});

export default RoomMessage;