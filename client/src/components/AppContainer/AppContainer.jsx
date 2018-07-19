import React from 'react';
import { Switch, Route } from 'react-router-dom';

import MainWindow from '../MainWindow/MainWindow.jsx';
import Navigation from '../Navigation/Navigation.jsx';

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
							<Route path="/chat" render={() => <h2>chat</h2>}/>
						</Switch>
					</div>
				</div>
			</div>
		);
	}
}

export default AppContainer;