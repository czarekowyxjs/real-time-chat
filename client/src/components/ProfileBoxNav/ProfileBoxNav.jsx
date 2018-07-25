import React from 'react';

import FormatAvatarUrl from '../../helpers/FormatAvatarUrl';

import "./ProfileBoxNav.css";

class ProfileBoxNav extends React.Component {
	constructor(props) {
		super(props);

		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(e) {
		const file = e.target.files[0];
		const reader = new FileReader();
		const token = localStorage.getItem("token");

		reader.onload = () => {
			this.props.methods.changeAvatar({
				URI: reader.result,
				size: file.size,
				type: file.type,
				name: file.name
			}, token);
		};

		if(file) {
			reader.readAsDataURL(file);
		}
	}

	render() {
		const user = this.props.user;
		return (
			<div className="profile-box">
				<div className="profile-box-user">
					<img src={FormatAvatarUrl(user.avatar, user.uid)} alt={user.username}/>
					<div className="profile-box-user-nick">
						<p>{user.username}</p>
						<label htmlFor="changeAvatar">change avatar</label>
						<input 
							type="file"
							id="changeAvatar"
							className="profile-box-change-avatar"
							onChange={this.handleChange}
						/>
					</div>
				</div>
			</div>
		);
	}
}

export default ProfileBoxNav;