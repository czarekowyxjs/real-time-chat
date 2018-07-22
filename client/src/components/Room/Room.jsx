import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import socket_io from 'socket.io-client';
import { verifyRoom, returnToDefaultVerifyRoom, updateOnlineUsersList, pushMessage, getAllMessages, returnToDefaultMessages } from '../../actions/roomActions';
import Message from '../Message/Message.jsx';
import UsersList from './UsersList.jsx';

import "./Room.css";

let socket;

class Room extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			message: '',
			first: false
		};

		socket = socket_io("http://localhost:3001");
	
		this.verifyRoom = this.verifyRoom.bind(this);
		this.getAllMessages = this.getAllMessages.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleKeyPress = this.handleKeyPress.bind(this);
		this.handleScroll = this.handleScroll.bind(this);
		this.sendMessage = this.sendMessage.bind(this);
		this.renderMessages = this.renderMessages.bind(this);
		this.leaveRoom = this.leaveRoom.bind(this);

		// refs
		this.chatMessagesRef = React.createRef();
	}

	componentWillUnmount() {
		this.props.returnToDefaultVerifyRoom();
		this.props.returnToDefaultMessages();
		socket.disconnect();
	}

	componentDidMount() {
		this.verifyRoom();
		this.getAllMessages();
	}

	leaveRoom() {
		this.props.history.replace("/");
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

		socket.on('newMessage', data => {
			let scrollToMessage = false;

			if(this.chatMessagesRef.current.scrollTop === this.chatMessagesRef.current.scrollHeight-this.chatMessagesRef.current.offsetHeight) {
				scrollToMessage = true;
			}
			this.props.pushMessage(this.props.room.messages, data.message);

			if(scrollToMessage) {
				this.chatMessagesRef.current.scrollTop = this.chatMessagesRef.current.scrollHeight-this.chatMessagesRef.current.offsetHeight;
			}
		});
	}

	getAllMessages() {
		const token = localStorage.getItem("token");
		const page = this.props.room.messagesPage;
		const rid = this.props.match.params.rid;
		const newMessages = this.props.room.newMessages;

		this.props.getAllMessages(page, newMessages, rid, token);
	}

	handleChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		});
		this.chatMessagesRef.current.scrollTop = this.chatMessagesRef.current.scrollHeight-this.chatMessagesRef.current.offsetHeight;
	}

	handleKeyPress(e) {
		if(e.key === "Enter") {
			e.preventDefault();
			this.sendMessage();
		}
	}

	handleScroll(e) {
		if(this.props.room.messagesLoaded) {
			if(e.target.scrollTop < 4) {
				this.chatMessagesRef.current.scrollTop = 5;

				this.getAllMessages();
			}
		} else {
			e.preventDefault();
		}
	}

	sendMessage() {
		if(this.state.message.length > 0 && this.state.message.length < 999) {
			socket.emit("sendMessage", {
				uid: this.props.user.user.uid,
				rid: this.props.room.roomData.rid,
				message: this.state.message
			});

			this.setState({
				message: ''
			});
		}
	}

	renderMessages() {
		const messages = this.props.room.messages;
		const usersAllList = this.props.room.usersAllList;
		let user,
				userData,
				renderAvatar;

		return messages.map((key, index) => {


			for(let i = 0;i < usersAllList.length;++i) {
				if(usersAllList[i].uid === key.uid) {
					user = usersAllList[i];
					break;
				}
			}

			userData = {
				author: this.props.user.user.uid === key.uid ? true : false,
				user: user
			};

			renderAvatar = true;

			if(!userData.author && messages[index+1]) {
				if(userData.user.uid === messages[index+1].uid) {
					renderAvatar = false;
				}
			}

			return <Message key={key.mid} message={key} userData={userData} renderAvatar={renderAvatar}/>;
		});
	}

	render() {
		if(!this.props.room.verifyRoomLoaded) {
			return <p>Loading...</p>;
		}
		if(this.props.room.verifyRoomError.status) {
			return <Redirect to="/join"/>;
		}

		const room = this.props.room;
		return (
			<div id="room-root">
				<div className="room-root-app-side">
					<div className="room-header">
					</div>
					<div className="room-body">
						<div className="room-chat-app">
							<div className="chat-app-messages" ref={this.chatMessagesRef} onScroll={this.handleScroll}>
								{this.renderMessages()}
							</div>
							<div className="chat-app-input">
								<div className="app-input-mess">
									<textarea
										name="message"
										id="message"
										value={this.state.message}
										onChange={this.handleChange}
										onKeyPress={this.handleKeyPress}
									></textarea>
									<label htmlFor="message" className={this.state.message.length > 0 ? "invisible" : null}>Type your message...</label>
								</div>
								<div className={this.state.message.length > 0 ? "app-input-send" : "invisible"}>
									<p onClick={this.sendMessage}>Send</p>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="room-root-aside">
					<div className="room-root-aside-content">
						<div className="room-aside-title">
							<div>
								<h2>{room.roomData.room_name}</h2>
								<p>{`#${room.roomData.rid}`}</p>
							</div>
						</div>
						<UsersList allUsers={room.usersAllList} onlineUsers={room.usersOnlineList}/>
					</div>
					<div className="room-root-aside-footer">
						<div className="room-aside-leave">
							<button onClick={this.leaveRoom}>
								Leave room
							</button>
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

export default connect(mapStateToProps, { verifyRoom, returnToDefaultVerifyRoom, updateOnlineUsersList, pushMessage, getAllMessages, returnToDefaultMessages })(Room);