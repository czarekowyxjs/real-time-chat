import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import FormatAvatarUrl from '../../helpers/FormatAvatarUrl';
 
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
		return (
			<div id="nav-bar">
				<div className="nav-bar-body">
					<div className="chat-logo">
						<h1><Link to="/">Real time chat</Link></h1>
						<p>version 0.1.0</p>
					</div>
					<div className="profile-box">
						<Link to={`/account/${user.uid}`}>
							<img src={FormatAvatarUrl(user.avatar, user.uid)} alt={user.username}/>
							<p>{user.username}</p>
						</Link>
					</div>
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

export default connect(mapStateToProps)(Navigation);