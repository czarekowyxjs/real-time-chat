import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginBySocket, loginSuccess, loginError } from '../../actions/authActions';

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

	componentDidMount() {
		this.props.socket.on('loginSuccess', this.props.loginSuccess);
		this.props.socket.on('loginError', this.props.loginError);
	}

	componentWillUnmount() {
		this.props.socket.removeListener('loginSuccess', this.props.loginSuccess);
		this.props.socket.removeListener('loginError', this.props.loginError);		
	}

	handleSubmit(e) {
		e.preventDefault();

		this.props.loginBySocket(this.props.socket, {
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
		if(this.props.auth.logged) return <Redirect to="/dashboard"/>;

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
		auth: state.auth
	}
};

export default connect(mapStateToProps, { loginBySocket, loginSuccess, loginError })(Login);