import React from 'react';

import "./Join.css";

class Join extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			room: ''
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidMount() {
		if(this.props.match.params.hash) {
			this.setState({
				room: this.props.match.params.hash
			});
		}
	}

	handleChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		});
	}

	handleSubmit() {

	}

	render() {
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
						<div className="btn-wrapper">
							<button type="submit" className="btn btn-green">Join</button>
						</div>
					</form>
				</div>
			</div>
		);
	}
}

export default Join;