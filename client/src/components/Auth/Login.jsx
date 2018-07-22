import React from 'react';
import { Redirect } from 'react-router-dom';
import queryString from 'query-string';
import { connect } from 'react-redux';
import { authLogin, returnToInitialState } from '../../actions/loginActions';
import Header from '../LandPage/Header.jsx';

import "./Auth.css";

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

	componentDidUpdate() {
		if(this.props.location) {
			const parsedQuery = queryString.parse(this.props.location.pathname);

			if(parsedQuery['/login/reg']) {
				this.props.authLogin({
					username: parsedQuery.u,
					password: parsedQuery.p
				});
			}
		}
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
		if(this.props.login.loaded && !this.props.login.loginError.status) {
			return <Redirect to="/"/>;
		}

		return (
			<div className="land-page-body">
				<Header/>
				<div className="auth-form">
					<h2>Log in to real time chat</h2>
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
						<label htmlFor="password">Password</label>
						<input 
							type="password"
							value={this.state.password}
							name="password"
							onChange={this.handleChange}
							id="password"
							className="default-input"
						/>
						<div className="btn-wrapper">
							<button type="submit" className="btn btn-white">Log In</button>
						</div>
					</form>
				</div>
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