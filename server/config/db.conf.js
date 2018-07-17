import Sequelize from 'sequelize';
import config from './server.conf';

const db = config.db;

export default new Sequelize(db.database, db.user, db.password, db.configuration);