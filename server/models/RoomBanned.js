import Sequelize from 'sequelize';
import db from '../config/db.conf';

const RoomBanned = db.define('RoomBanned', {
	bid: {
		type: Sequelize.BIGINT,
		unique: true,
		autoIncrement: true,
		primaryKey: true,
		field: 'bid'
	},
	uid: {
		type: Sequelize.BIGINT,
		field: "uid"
	},
	rid: {
		type: Sequelize.BIGINT,
		field: "rid"
	},
	reason: {
		type: Sequelize.STRING(999),
		field: 'reason'
	},
	_createdAt: {
		type: Sequelize.STRING(99),
		field: '_createdAt'
	}
}, {
	hooks: {
		beforeCreate: (roomBanned, options) => {
			return roomBanned._createdAt = Math.floor(new Date().getTime()/1000);
		}
	},
	tableName: 'room_banned',
	timestamps: false
});

export default RoomBanned;