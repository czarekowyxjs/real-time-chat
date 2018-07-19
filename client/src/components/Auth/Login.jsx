import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { authLogin, returnToInitialState } from '../../actions/loginActions';

class Login extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			username: '',
			password: ''
		};

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	componentWillUnmount() {
		this.props.returnToInitialState();
	}

	handleSubmit(e) {
		e.preventDefault();

		this.props.authLogin({
			username: this.state.username,
			password: this.state.password
		});
	}

	handleChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		});
	}

	render() {
		if(this.props.login.loaded) {
			return <Redirect to="/"/>;
		}

		return (
			<div className="auth-form">
				<form onSubmit={this.handleSubmit}>
					<label htmlFor="username">Username</label>
					<input 
						type="text"
						value={this.state.username}
						name="username"
						onChange={this.handleChange}
						id="username"
					/>
					<label htmlFor="password">Password</label>
					<input 
						type="password"
						value={this.state.password}
						name="password"
						onChange={this.handleChange}
						id="password"
					/>
					<button type="submit">Log In</button>
				</form>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		login: state.login
	}
};

export default connect(mapStateToProps, { authLogin, returnToInitialState })(Login);