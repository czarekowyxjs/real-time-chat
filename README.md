# real-time-chat

![real time chat images](https://i.imgur.com/8XegiET.gif)

#### Table of contents
* [How to run this app?](#how-to-run)
* [Technologies used](#technologies)
* [Features](#features)
* [Command line](#cli)
* [In the future](#future)
* [License](#license)

<a name="how-to-run"/>

## How to run this app locally?
1. Firstly download repository
```
$ git clone https://github.com/czarekowyxjs/real-time-chat.git
```
2. Then enter to app folder
```
$ cd real-time-chat
```
3. Now you have to install dependencies for server(backend) and client(frontend)
```
$ cd server
$ npm install
$ cd ..
$ cd client
$ npm install
$ cd ..
```
4. So, if you want to start app, you need database. In downloaded repository is `real-time-chat.sql` file. It's best to use phpmyadmin to import this file(Remeber, before you import this file, firstly you must create database, and import this file into created database). And you should edit `./server/config/server.conf.js` and `./client/src/config/config.js` files.
Finally to run app, you must start two processes(client and server) in two different terminals
```
$ cd server
$ npm start
```
and
```
$ cd client
$ npm start
```
5. It's working!

<a name="technologies"/>

## Technologies used
* [Express.js v.4.16.3](https://expressjs.com) for backend
* [Sequelize.js v.4.38.0](http://docs.sequelizejs.com) for database models and building queries
* [React.js](https://reactjs.org) - [create-react-app](https://github.com/facebook/create-react-app), [React-router](https://github.com/ReactTraining/react-router) for best UX
* [Redux v.4.0](https://redux.js.org) to store data
* [Axios v.0.18.0](https://github.com/axios/axios), [Redux-thunk](https://github.com/reduxjs/redux-thunk) for asonchrynus requests
* [Socket.io v.2.1.1](https://socket.io) for real time data exchange
* [MySQL](https://www.mysql.com) as DBSM, [mysql2 v.1.5.3](https://www.npmjs.com/package/mysql2) module for nodejs

<a name="features"/>

## Features
* User authentication, login, register
* Store users, messages, rooms etc. in db
* Create and join to rooms
* Password to room
* Visible active users in room
* Real time chating
* Messages load on scroll up in group conversation
* Avatars, possible change of avatar
* Room admin - can ban and unban
* Invite to chat room by link
* Real time preview of your rooms
* Command line

<a name="cli"/>

## Command line

Only chat room admin can use command line. Command line is working in message input.
When command line is active, you can't send messages.
* `/cli run` - it's starting command line
* `/cli exit` - it's closing command line
* `/cli -p newPassword newPasswordAgain` - by this command, you can change password to your room
* `/cli -ban username` - by this command, you can ban different users in your room
* `/cli -unban username` - by this command, you can unban users which you banned

<a name="future"/>

## In the future
* Private messages
* Expansion of command line
* Profile view
* ...

<a name="license"/>

## LICENSE
I used [MIT](https://opensource.org/licenses/MIT) license
