import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { changeAvatar } from '../../actions/userActions';
import ProfileBoxNav from '../ProfileBoxNav/ProfileBoxNav.jsx';
 
import "./Navigation.css";

class Navigation extends React.Component {
	constructor(props) {
		super(props);
	
		this.handleLogout = this.handleLogout.bind(this);
	}

	handleLogout() {
		this.props.history.replace("/logout");
	}

	render() {
		const user = this.props.user.user;
		const ProfileBoxNavMethods = {
			changeAvatar: this.props.changeAvatar
		};
		
		return (
			<div id="nav-bar">
				<div className="nav-bar-body">
					<div className="chat-logo">
						<h1><Link to="/">Real time chat</Link></h1>
						<p>version 0.1.0</p>
					</div>
					<ProfileBoxNav user={user} methods={ProfileBoxNavMethods}/>
				</div>
				<div className="nav-bar-footer">
					<div className="nav-bar-logout">
						<button type="submit" onClick={this.handleLogout}><p>Log out</p></button>
					</div>
				</div>
			</div>
		);

	}
}

const mapStateToProps = state => {
	return {
		user: state.user
	};
};

export default connect(mapStateToProps, { changeAvatar })(Navigation);