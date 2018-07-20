// modules
import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
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

// init server
const app = express();

// middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// apply controllers and routes
app.use("/api/auth", AuthController);
app.use("/api/room", RoomController);

// serve static files
app.use("/public", express.static(__dirname+"/public"));

// create server
const server = http.createServer(app);

// socket server
const io = socket_io.listen(server);

io.on("connection", socket => {
	
	socket.on('joinToRoom', data => {

		db.RoomUserOnline
		.create({
			uid: data.user.uid,
			rid: data.rid,
			socket: socket.id
		})
		.then(resRoomUserOnline => {

			db.RoomUserOnline
			.findAll({
				where: {
					rid: data.rid
				},
				order: [
					['_createdAt', 'DESC']
				],
				include: [{
					model: db.User,
					attributes: ['uid', 'username', "avatar"]
				}]
			})
			.then(resRoomUserOnlineAll => {

				socket.join(data.rid);
				io.to(data.rid).emit("updateUsersList", {
					users: resRoomUserOnlineAll
				});

			})
			.catch(err => {

			});

		})
		.catch(err => {

		});
	});

	socket.on("disconnect", () => {
		db.RoomUserOnline
		.findOne({
			where: {
				socket: socket.id
			}
		})
		.then(resOnlineUser => {
			if(resOnlineUser) {
				db.RoomUserOnline
				.destroy({
					where: {
						socket: socket.id
					}
				})
				.then(resRoomUserOnline => {
					db.RoomUserOnline
					.findAll({
						where: {
							rid: resOnlineUser.rid
						},
						order: [
							['_createdAt', 'DESC']
						],
						include: [{
							model: db.User,
							attributes: ['uid', 'username', "avatar"]
						}]
					})
					.then(resRoomUserOnlineAll => {
						
						socket.leave(resOnlineUser.rid);
						io.to(resOnlineUser.rid).emit("updateUsersList", {
							users: resRoomUserOnlineAll
						});

					})
					.catch(err => {

					});
				})
				.catch(err => {

				});				
			}
		})
		.catch(err => {

		});
	});
});

// start server
server.listen(config.port, () => {
	console.log('Server is running');
});