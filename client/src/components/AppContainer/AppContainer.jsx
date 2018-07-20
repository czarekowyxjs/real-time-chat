import React from 'react';
import { Switch, Route } from 'react-router-dom';

import MainWindow from '../MainWindow/MainWindow.jsx';
import Navigation from '../Navigation/Navigation.jsx';
import Join from '../Join/Join.jsx';
import Create from '../Create/Create.jsx';
import Room from '../Room/Room.jsx';

import "./AppContainer.css";

class AppContainer extends React.Component {
	render() {
		return (
			<div id="app-container">
				<div id="root-app">
					<div id="root-app-header">
						<Navigation/>
					</div>
					<div id="root-app-body">
						<Switch>
							<Route path="/" exact={true} component={MainWindow}/>
							<Route path="/join/:hash" component={Join}/>
							<Route path="/join" component={Join}/>
							<Route path="/create" component={Create}/>
							<Route path="/room/:rid" component={Room}/>
						</Switch>
					</div>
				</div>
			</div>
		);
	}
}

export default AppContainer;