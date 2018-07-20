import React from 'react';
import { Switch, Route } from 'react-router-dom';
import socket_io from 'socket.io-client';

import MainWindow from '../MainWindow/MainWindow.jsx';
import Navigation from '../Navigation/Navigation.jsx';
import Join from '../Join/Join.jsx';
import Create from '../Create/Create.jsx';
import Room from '../Room/Room.jsx';

import "./AppContainer.css";

let socket;

class AppContainer extends React.Component {
	constructor(props) {
		super(props);
	
		socket = socket_io("http://localhost:3001");
	}

	render() {
		return (
			<div id="app-container">
				<div id="root-app">
					<div id="root-app-header">
						<Navigation socket={socket}/>
					</div>
					<div id="root-app-body">
						<Switch>
							<Route path="/" exact={true} component={MainWindow}/>
							<Route path="/join" render={(props) => <Join {...props} socket={socket}/>}/>
							<Route path="/create" render={(props) => <Create {...props} socket={socket}/>}/>
							<Route path="/room/:rid" render={(props) => <Room {...props} socket={socket}/>}/>
						</Switch>
					</div>
				</div>
			</div>
		);
	}
}

export default AppContainer;