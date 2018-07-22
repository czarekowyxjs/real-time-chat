import React from 'react';
import FormatAvatarUrl from '../../helpers/FormatAvatarUrl';

import "./Message.css";

class Message extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			visibilityPopUp: false
		};


		this.handleMouseEnter = this.handleMouseEnter.bind(this);
		this.handleMouseLeave = this.handleMouseLeave.bind(this);
	}
	componentDidMount() {

	}

	handleMouseEnter(e) {
		this.setState({
			visibilityPopUp: true
		});
	}

	handleMouseLeave(e) {
		this.setState({
			visibilityPopUp: false
		});
	}

	render() {
		const mess = this.props;
		const messageAuthor = !mess.userData.author && mess.renderAvatar ? (<div className="message-author">
					<div className="message-author-avatar">
						<img 
							src={FormatAvatarUrl(mess.userData.user.User.avatar)} 
							alt={mess.userData.user.User.username}
							onMouseEnter={this.handleMouseEnter}
							onMouseLeave={this.handleMouseLeave}/>
						<div className={`message-author-hover ${this.state.visibilityPopUp ? "show" : "hide"}`}>
							<p>{mess.userData.user.User.username}</p>
						</div>
					</div>
				</div>) : null;

		return (
			<div className={`message-wrapper ${mess.userData.author ? "self" : "some"}`}>
				{messageAuthor}
				<div className={`message-content ${mess.renderAvatar ? "avatar" : "empty-avatar"}`}>
					<p>{mess.message.content}</p>
				</div>
			</div>
		);
	}
}

export default Message;