import React from 'react';
import { Link } from 'react-router-dom';
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
					<Link to={`/account/${user.uid}`}>
						<img src="/public/images/default-avatar.png" alt={user.username}/>
						<p>{user.username}</p>
					</Link>
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