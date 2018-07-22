import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { authRegister, returnToInitialState } from '../../actions/registerActions';
import Header from '../LandPage/Header.jsx';

import "./Auth.css";

class Login extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			username: '',
			email: '',
			password: '',
			passwordAgain: ''
		};

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	componentWillUnmount() {
		this.props.returnToInitialState();
	}

	handleSubmit(e) {
		e.preventDefault();

		this.props.authRegister({
			username: this.state.username,
			email: this.state.email,
			password: this.state.password,
			passwordAgain: this.state.passwordAgain
		});
	}

	handleChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		});
	}

	render() {
		if(this.props.register.loaded && !this.props.register.registerError.status) {
			return <Redirect to={`/login/reg=true&u=${this.state.username}&p=${this.state.password}`}/>;
		}

		return (
			<div className="land-page-body">
				<Header/>
				<div className="auth-form">
					<h2>Sign up in real time chat</h2>
					<form onSubmit={this.handleSubmit}>
						<label htmlFor="username">Username</label>
						<input 
							type="text"
							value={this.state.username}
							name="username"
							onChange={this.handleChange}
							id="username"
							className="default-input"
						/>
						<label htmlFor="email">Email</label>
						<input 
							type="email"
							value={this.state.email}
							name="email"
							onChange={this.handleChange}
							id="email"
							className="default-input"
						/>
						<label htmlFor="password">Password</label>
						<input 
							type="password"
							value={this.state.password}
							name="password"
							onChange={this.handleChange}
							id="password"
							className="default-input"
						/>
						<label htmlFor="passwordAgain">Repeat your password</label>
						<input 
							type="password"
							value={this.state.passwordAgain}
							name="passwordAgain"
							onChange={this.handleChange}
							id="passwordAgain"
							className="default-input"
						/>
						<div className="btn-wrapper">
							<button type="submit" className="btn btn-white">Sign Up</button>
						</div>
					</form>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		register: state.register
	}
};

export default connect(mapStateToProps, { authRegister, returnToInitialState })(Login);