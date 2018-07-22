import React from 'react';
import FormatAvatarUrl from '../../helpers/FormatAvatarUrl';
import FormatUnixTime from '../../helpers/FormatUnixTime';

import "./Message.css";

class Message extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			visibilityPopUp: false,
			visibilityCreated: false
		};


		this.handleMouseEnter = this.handleMouseEnter.bind(this);
		this.handleMouseLeave = this.handleMouseLeave.bind(this);
	}

	handleMouseEnter(e, type) {
		if(type === "avatar") {
			this.setState({
				visibilityPopUp: true
			});
		} else if(type === "created") {
			this.setState({
				visibilityCreated: true
			});			
		}
	}

	handleMouseLeave(e, type) {
		if(type === "avatar") {
			this.setState({
				visibilityPopUp: false
			});
		} else if(type === "created") {
			this.setState({
				visibilityCreated: false
			});			
		}
	}

	render() {
		const mess = this.props;
		const messageAuthor = !mess.userData.author && mess.renderAvatar ? (<div className="message-author">
					<div className="message-author-avatar">
						<img 
							src={FormatAvatarUrl(mess.userData.user.User.avatar)} 
							alt={mess.userData.user.User.username}
							onMouseEnter={(e) => this.handleMouseEnter(e, "avatar")}
							onMouseLeave={(e) => this.handleMouseLeave(e, "avatar")}/>
						<div className={`message-author-hover ${this.state.visibilityPopUp ? "show" : "hide"}`}>
							<p>{mess.userData.user.User.username}</p>
						</div>
					</div>
				</div>) : null;

		return (
			<div className={`message-wrapper ${mess.userData.author ? "self" : "some"}`}>
				{messageAuthor}
				<div 
				className={`message-content ${mess.renderAvatar ? "avatar" : "empty-avatar"}`}
				onMouseEnter={(e) => this.handleMouseEnter(e, "created")}
				onMouseLeave={(e) => this.handleMouseLeave(e, "created")}>
					<p>{mess.message.content}</p>
					<div className={this.state.visibilityCreated ? "message-created" : "invisible"}>
						<p>{FormatUnixTime(mess.message._createdAt)}</p>
						<div className="message-created-triangle"></div>
					</div>
				</div>
			</div>
		);
	}
}

export default Message;