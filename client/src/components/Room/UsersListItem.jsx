import React, { Component } from 'react';
import FormatAvatarUrl from '../../helpers/FormatAvatarUrl';

class UsersListItem extends Component {
	render() {
		const user = this.props.user;
		return (
			<div className="users-list-item">
				<div className="users-list-item-info">
					<img src={FormatAvatarUrl(user.User.avatar)} alt={user.User.username}/>
					<p>{user.User.username}</p>
				</div>
			</div>
		);
	}
}

export default UsersListItem;