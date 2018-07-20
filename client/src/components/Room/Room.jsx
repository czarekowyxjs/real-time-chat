import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import socket_io from 'socket.io-client';
import { verifyRoom, returnToDefaultVerifyRoom, updateOnlineUsersList } from '../../actions/roomActions';
import Message from '../Message/Message.jsx';

import "./Room.css";

let socket;

class Room extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			message: ''
		};

		socket = socket_io("http://localhost:3001");
	
		this.verifyRoom = this.verifyRoom.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.renderMessages = this.renderMessages.bind(this);
	}

	componentWillUnmount() {
		this.props.returnToDefaultVerifyRoom();
		socket.disconnect();
	}

	componentDidMount() {
		this.verifyRoom();
	}

	verifyRoom() {
		const token = localStorage.getItem("token");
		const rid = this.props.match.params.rid;
		const user = this.props.user.user;

		this.props.verifyRoom(rid, token);

		socket.emit("joinToRoom", {
			rid: rid,
			user: user
		});

		socket.on("updateUsersList", data => {
			this.props.updateOnlineUsersList(data.users);
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
				<div className="room-root-app-side">
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
				<div className="room-root-aside">

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