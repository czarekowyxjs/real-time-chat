import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { verifyRoom, returnToDefaultVerifyRoom, updateOnlineUsersList } from '../../actions/roomActions';
import Message from '../Message/Message.jsx';

import "./Room.css";

class Room extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			message: ''
		};
	
		this.verifyRoom = this.verifyRoom.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.renderMessages = this.renderMessages.bind(this);
	}

	componentWillUnmount() {
		const rid = this.props.match.params.rid;
		const user = this.props.user.user;

		this.props.socket.emit("leaveRoom", {
			user: user,
			rid: rid
		});
		
		this.props.returnToDefaultVerifyRoom();
	}

	componentDidMount() {
		this.verifyRoom();
	}

	verifyRoom() {
		const token = localStorage.getItem("token");
		const rid = this.props.match.params.rid;
		const user = this.props.user.user;

		this.props.verifyRoom(rid, token);

		this.props.socket.emit("joinToRoom", {
			rid: rid,
			user: user
		});

		this.props.socket.on("updateUsersList", data => {
			console.log(data);
			const user = data.user;
			this.props.updateOnlineUsersList(this.props.room.usersOnlineList, user);
		});
	}

	handleChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		});
	}

	renderMessages() {
		return null;
	}

	render() {
		console.log(this.props);
		if(!this.props.room.verifyRoomLoaded) {
			return <p>Loading room...</p>;
		}
		if(this.props.room.verifyRoomError.status) {
			return <Redirect to="/join"/>;
		}

		const room = this.props.room;

		return (
			<div id="room-root">
				<div className="room-header">
					<div className="room-header-title">
						<h2>{room.roomData.room_name}</h2>
						<p>{`#${room.roomData.rid}`}</p>
					</div>
				</div>
				<div className="room-body">
					<div className="room-chat-app">
						<div className="chat-app-messages">

						</div>
						<div className="chat-app-input">
							<textarea
								name="message"
								id="message"
								value={this.state.message}
								onChange={this.handleChange}
							></textarea>
							<label htmlFor="message" className={this.state.message.length > 0 ? "invisible" : null}>Type your message...</label>
						</div>
					</div>
				</div>
			</div>
		);	
	}
}

const mapStateToProps = state => {
	return {
		room: state.room,
		user: state.user
	};
};

export default connect(mapStateToProps, { verifyRoom, returnToDefaultVerifyRoom, updateOnlineUsersList })(Room);