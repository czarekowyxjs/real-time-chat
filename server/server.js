// modules
import express from 'express';
import helmet from 'helmet';
import http from 'http';
import bodyParser from 'body-parser';
import validator from 'express-validator';
import cors from 'cors';
import socket_io from 'socket.io';

// import configuration
import config from './config/server.conf';

// custom error
import CustomError from './helpers/CustomError';

// db models
import db from './models';

// routes and controllers
import AuthController from './controllers/auth.controller';
import RoomController from './controllers/room.controller';
import MessageController from './controllers/message.controller';

// socket.io chat controller
import Chat from './socket/Chat';

// it will be chat instance
let chat;

// init server
const app = express();

// middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(validator());

// apply controllers and routes
app.use("/api/auth", AuthController);
app.use("/api/room", RoomController);
app.use("/api/message", MessageController);

// serve static files
app.use("/public", express.static(__dirname+"/public"));

// create server
const server = http.createServer(app);

// socket server
const io = socket_io.listen(server);

io.on("connection", socket => {
	
	chat = new Chat(io, socket, db);

});

// start server
server.listen(config.port, () => {
	console.log('Server is running');
});