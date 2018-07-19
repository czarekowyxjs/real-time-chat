// modules
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

// import configuration
import config from './config/server.conf';

// custom error
import CustomError from './helpers/CustomError';

// controllers with routes

// db models
import db from './models';

// routes and controllers
import AuthController from './controllers/auth.controller';

// init server
const server = express();

// middlewares
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(cors());

// apply controllers and routes
server.use("/api/auth", AuthController);

// serve static files


// start server
server.listen(config.port, () => {
	console.log('Server is running');
});