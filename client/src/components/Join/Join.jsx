import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { joinToRoom, returnToDefaultJoin } from '../../actions/roomActions';

import "./Join.css";

class Join extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			room: '',
			password: ''
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentWillUnmount() {
		this.props.returnToDefaultJoin();
	}

	componentDidMount() {
		if(this.props.match.params.rid) {
			this.setState({
				room: this.props.match.params.rid
			});
		}
	}

	handleChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		});
	}

	handleSubmit(e) {
		e.preventDefault();

		const rid = this.state.room;
		const password = this.state.password;
		const token = localStorage.getItem("token");
		this.props.joinToRoom(rid, password, token);
	}

	render() {
		if(this.props.room.joinLoaded && !this.props.room.joinError.status) {
			this.props.socket.emit("getAllRooms", {
				uid: this.props.user.user.uid
			});
			return <Redirect to={`/room/${this.state.room}`}/>;
		}	
		
		return (
			<div className="window-wrapper">
				<div className="room-join-form">
					<form onSubmit={this.handleSubmit}>
						<label htmlFor="room">Identifier of room</label>
						<input 
							type="text" 
							className="default-input"
							value={this.state.room}
							name="room"
							id="room"
							onChange={this.handleChange}
						/>
						<label htmlFor="password">Room password</label>
						<input 
							type="password" 
							className="default-input"
							value={this.state.password}
							name="password"
							id="password"
							onChange={this.handleChange}
						/>
						<p>If you have already entered to this room, you don't need to enter password.</p>
						<div className="btn-wrapper">
							<button type="submit" className="btn btn-green">Join</button>
						</div>
					</form>
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

export default connect(mapStateToProps, { joinToRoom, returnToDefaultJoin })(Join);