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
		const roomData = this.props.roomData;
		let admin;

		return onlineUsers.map((key, index) => {

			admin = false;

			for(let i = 0;i < index;++i) {
				if(onlineUsers[i].uid === key.uid) {
					return null;
				}
			}

			if(roomData.admin_uid === key.uid) {
				admin = true;
			}

			return <UsersListItem key={key.uid} user={key} admin={admin}/>;
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