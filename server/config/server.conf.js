export default {
	port: process.env.PORT || 8000,
	db: {
		database: 'real-time-chat' || process.env.DB_NAME,
		user: 'root' || process.env.DB_USER,
		password: '' || process.env.DB_PASSWORD,
		configuration: {
			host: "localhost" || process.env.DB_HOST,
			dialect: 'mysql'
		}
	}
};