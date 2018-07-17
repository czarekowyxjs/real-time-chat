import User from './User';
import Token from './Token';

Token.belongsTo(User, { foreignKey: 'uid' });
User.hasOne(Token, { foreignKey: 'uid' });

export default {
	User,
	Token
};