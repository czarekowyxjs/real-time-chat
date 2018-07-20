import User from './User';
import Token from './Token';
import Room from './Room';
import RoomUser from './RoomUser';
import RoomUserOnline from './RoomUserOnline';
import RoomMessage from './RoomMessage';

Token.belongsTo(User, { foreignKey: 'uid' });
User.hasOne(Token, { foreignKey: 'uid' });

RoomUser.belongsTo(Room, { foreignKey: 'rid' });
Room.hasMany(RoomUser, { foreignKey: 'rid' });

RoomUserOnline.belongsTo(Room, { foreignKey: 'rid' });
Room.hasMany(RoomUserOnline, { foreignKey: 'rid' });

RoomMessage.belongsTo(Room, { foreignKey: 'rid' });
Room.hasMany(RoomMessage, { foreignKey: 'rid' });

export default {
	User,
	Token,
	Room,
	RoomUser,
	RoomUserOnline,
	RoomMessage
};