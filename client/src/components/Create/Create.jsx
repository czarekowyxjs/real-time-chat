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
			password: ''
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
		this.props.createNewRoom(this.state.room, this.state.password, token);
	}

	render() {
		if(this.props.room.createLoaded) {
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
						<p>Name of your room, it should reflect the thematics of the room</p>
						<label htmlFor="room">Room password</label>
						<input 
							type="password" 
							className="default-input"
							value={this.state.password}
							name="password"
							id="password"
							onChange={this.handleChange}
						/>
						<p>Password will be need to for other users to join to your room</p>
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
		room: state.room
	};
};

export default connect(mapStateToProps, { createNewRoom, returnToDefaultCreateRoom })(Create);