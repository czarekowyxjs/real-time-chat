import React from 'react';

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
				<label htmlFor="room">Name of room</label>
				<input 
					type="text" 
					className="default-input"
					value={this.state.room}
					name="room"
					id="room"
					onChange={this.handleChange}
				/>
				<button type="submit" onClick={this.handleSubmit} className="btn btn-green">Enter</button>

			</div>
		);
	}
}

export default Join;