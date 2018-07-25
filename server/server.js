// modules
import express from 'express';
import helmet from 'helmet';
import http from 'http';
import bodyParser from 'body-parser';
import validator from 'express-validator';
import cors from 'cors';
import path from 'path';
import socket_io from 'socket.io';

// import configuration
import config from './config/server.conf';

// custom error
import CustomError from './helpers/CustomError';

// db models
import db from './models';

// routes and controllers
import AuthController from './controllers/auth.controller';
import UserController from './controllers/user.controller';
import RoomController from './controllers/room.controller';
import MessageController from './controllers/message.controller';

// socket.io chat controller
import Chat from './socket/Chat';
import User from './socket/User';

// it will be chat instance
let chatSocket, userSocket;

// init server
const app = express();

// middlewares
app.use(bodyParser.json({ limit: '1024kb' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(validator({
	customValidators: {
		isImage: (value, filename) => {
			const ext = (path.extname(filename)).toLowerCase();
			switch(ext) {
				case '.jpg':
					return '.jpg';
				case '.png':
					return '.png';
				case '.jpeg':
					return '.jpeg';
				case '.gif':
					return '.gif';
				default:
					return false;
			}
		}
	}
}));

// apply controllers and routes
app.use("/api/auth", AuthController);
app.use("/api/user", UserController);
app.use("/api/room", RoomController);
app.use("/api/message", MessageController);

// serve static files
app.use("/public", express.static(__dirname+"/public"));
app.use("/users", express.static(__dirname+"/users"));

// create server
const server = http.createServer(app);

// socket server
const io = socket_io.listen(server);

io.on("connection", socket => {
	chatSocket = new Chat(io, socket, db);
	userSocket = new User(io, socket, db);
});

// start server
server.listen(config.port, () => {
	console.log('Server is running');
});