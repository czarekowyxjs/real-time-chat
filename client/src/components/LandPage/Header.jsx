import React from 'react';
import { NavLink } from 'react-router-dom';

import "./Header.css";

class Header extends React.Component {
	render() {
		return (
			<div className="land-page-header">
				<div className="land-page-logo">
					<h1>Real time chat</h1>
				</div>
				<div className="land-page-nav">
					<nav>
						<ul>
							<li><NavLink to="/login" activeClassName="activeLandNav">Login</NavLink></li>
							<li><NavLink to="/register" activeClassName="activeLandNav">Sign Up</NavLink></li>
						</ul>
					</nav>
				</div>
			</div>
		);
	}
}

export default Header;