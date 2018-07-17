// modules
import restify from 'restify';
import socket_io from 'socket.io';

// import configuration
import config from './config/server.conf';

// db models
import db from './models';

// import classes of controllers for socket.io
import AuthController from './controllers/auth.controller';

// it will be instances of socket.io controllers
let authController;

// init server
const server = restify.createServer({
	name: "Api for real time chat"
});

// middlewares
server.use(restify.plugins.bodyParser());

// socket.io server
const io = socket_io(server.server);

io.sockets.on("connection", socket => {

	console.log(socket.id);

	authController = new AuthController(socket, db);

});


// start server
server.listen(config.port, () => {
	console.log('Server is running');
});