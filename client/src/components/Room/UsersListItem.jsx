import React, { Component } from 'react';
import FormatAvatarUrl from '../../helpers/FormatAvatarUrl';

class UsersListItem extends Component {
	render() {
		const user = this.props.user;
		return (
			<div className="users-list-item">
				<div className="users-list-item-info">
					<img src={FormatAvatarUrl(user.User.avatar, user.User.uid)} alt={user.User.username}/>
					<div className="user-item-info-basic">
						<div className="user-item-info-username">
							<p>{user.User.username}</p>
						</div>
						<div className="user-item-info-grade">
							{this.props.admin ? <p className="room-admin">Room administrator</p> : <p className="room-member">Member</p>}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default UsersListItem;