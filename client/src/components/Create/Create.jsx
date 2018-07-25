import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { createNewRoom, returnToDefaultCreateRoom } from '../../actions/roomActions';

import "./Create.css";

class Create extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			room: '',
			password: '',
			passwordAgain: ''
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentWillUnmount() {
		this.props.returnToDefaultCreateRoom();
	}

	handleChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		});
	}

	handleSubmit(e) {
		e.preventDefault();
		const token = localStorage.getItem("token");
		this.props.createNewRoom(this.state.room, this.state.password, this.state.passwordAgain, token);
	}

	render() {
		if(this.props.room.createLoaded && !this.props.room.createError.status) {
			this.props.socket.emit("getAllRooms", {
				uid: this.props.user.user.uid
			});
			return <Redirect to={`/room/${this.props.room.tmpRid}`}/>;
		}
		
		return (
			<div className="window-wrapper">
				<div className="room-create-form">
					<form onSubmit={this.handleSubmit}>
						<label htmlFor="room">Name of room</label>
						<input 
							type="text" 
							className="default-input"
							value={this.state.room}
							name="room"
							id="room"
							onChange={this.handleChange}
						/>
						<p>Name of your room, it should reflect the thematics of the room. Length of room name must have min 2 and max 99 characters.</p>
						<label htmlFor="password">Room password</label>
						<input 
							type="password" 
							className="default-input"
							value={this.state.password}
							name="password"
							id="password"
							onChange={this.handleChange}
						/>
						<p>Password will be need for other users to join to your room. Length of password must have min 6 characters.</p>
						<label htmlFor="passwordAgain">Repeat password to your room</label>
						<input 
							type="password" 
							className="default-input"
							value={this.state.passwordAgain}
							name="passwordAgain"
							id="passwordAgain"
							onChange={this.handleChange}
						/>
						<p>Passwords must be that same.</p>
						<div className="btn-wrapper">
							<button type="submit" className="btn btn-green">Create</button>
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

export default connect(mapStateToProps, { createNewRoom, returnToDefaultCreateRoom })(Create);