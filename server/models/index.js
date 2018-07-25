import User from './User';
import Token from './Token';
import Room from './Room';
import RoomUser from './RoomUser';
import RoomUserOnline from './RoomUserOnline';
import RoomMessage from './RoomMessage';
import RoomBanned from './RoomBanned';

Token.belongsTo(User, { foreignKey: 'uid' });
User.hasOne(Token, { foreignKey: 'uid' });

RoomUser.belongsTo(Room, { foreignKey: 'rid' });
Room.hasMany(RoomUser, { foreignKey: 'rid' });

RoomUser.belongsTo(User, { foreignKey: 'uid' });
User.hasMany(RoomUser, { foreignKey: 'uid' });

RoomUserOnline.belongsTo(User, { foreignKey: 'uid' });
User.hasMany(RoomUserOnline, { foreignKey: 'uid' });

RoomMessage.belongsTo(Room, { foreignKey: 'rid' });
Room.hasMany(RoomMessage, { foreignKey: 'rid' });

export default {
	User,
	Token,
	Room,
	RoomUser,
	RoomUserOnline,
	RoomMessage,
	RoomBanned
};