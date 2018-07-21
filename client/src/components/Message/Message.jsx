import React from 'react';

import "./Message.css";

class Message extends React.Component {
	render() {
		return (
			<div className="message-wrapper">
				<p>{this.props.message.content}</p>
			</div>
		);
	}
}

export default Message;