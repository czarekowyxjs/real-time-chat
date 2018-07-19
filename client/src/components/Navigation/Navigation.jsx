import React from 'react';
import { connect } from 'react-redux';
 
import "./Navigation.css";

class Navigation extends React.Component {
	render() {
		const user = this.props.user.user;
		return (
			<div id="nav-bar">
				<div className="chat-logo">
					<h1>Real time chat</h1>
					<p>version 0.1.0</p>
				</div>
				<div className="profile-box">
					<p>{user.username}</p>
					<img src="http://localhost:3001/public/images/default-avatar.png"/>
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

export default connect(mapStateToProps)(Navigation);