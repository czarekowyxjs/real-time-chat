import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { changeAvatar, updateRoomsList } from '../../actions/userActions';
import ProfileBoxNav from '../ProfileBoxNav/ProfileBoxNav.jsx';
import RoomsPreview from '../RoomsPreview/RoomsPreview.jsx';
 
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
		const RoomsPreviewMethods = {
			updateRoomsList: this.props.updateRoomsList
		};
		
		return (
			<div id="nav-bar">
				<div className="nav-bar-body">
					<div className="chat-logo">
						<h1><Link to="/">Real time chat</Link></h1>
						<p>version 0.1.0</p>
					</div>
					<ProfileBoxNav user={user} methods={ProfileBoxNavMethods}/>
					<RoomsPreview user={user} rooms={this.props.user.rooms} methods={RoomsPreviewMethods} socket={this.props.socket}/>
					<div className="nav-copy">
						<a href="https://github.com/czarekowyxjs/real-time-chat" target="_BLANK" title="Cezary Góralski" rel="noopener noreferrer">
							<img src="/public/images/github-logo.svg" alt="github logo"/>
							<p>czarekowyxjs</p>
						</a>
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

export default connect(mapStateToProps, { changeAvatar, updateRoomsList })(Navigation);