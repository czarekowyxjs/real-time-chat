# real-time-chat

***

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
4. So, if you want to start app, you need database. In downloaded repository is `real-time-chat.sql` file. It's best to use phpmyadmin to import this file.
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

***

## Technologies used
* [Express.js](https://expressjs.com) for backend
* [Sequelize.js](http://docs.sequelizejs.com) for database models and building queries
* [React.js](https://reactjs.org), [React-router](https://github.com/ReactTraining/react-router) for best UX
* [Redux](https://redux.js.org) to store data
* [Axios](https://github.com/axios/axios), [Redux-thunk](https://github.com/reduxjs/redux-thunk) for asonchrynus requests
* [Socket.io](https://socket.io) for real time data exchange
* [MySQL](https://www.mysql.com) as DBSM

***

## Application functions
* User authentication, login, register
* Create and join to rooms
* Password to room
* Visible active users in room
* Real time chating

***

### LICENSE
I used [MIT](https://opensource.org/licenses/MIT) license
