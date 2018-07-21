import React, { Component } from 'react';
import UsersListItem from './UsersListItem.jsx';

import "./UsersList.css";

class UsersList extends Component {
	constructor(props) {
		super(props);

		this.renderOnlineUsers = this.renderOnlineUsers.bind(this);
	}

	renderOnlineUsers() {
		const onlineUsers = this.props.onlineUsers;

		return onlineUsers.map((key, index) => {
			return <UsersListItem key={key.uid} user={key}/>;
		});
	}

	render() {
		return (
			<div className="room-aside-users-list">
				<div className="users-list-title">
					<h3>Online users</h3>
				</div>
				<div className="users-list-body">
					<div className="users-list-body-users">
						{this.renderOnlineUsers()}
					</div>
				</div>
			</div>
		);
	}
}

export default UsersList;