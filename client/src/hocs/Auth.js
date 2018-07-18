import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { verifyToken, verifyTokenSuccess, verifyTokenError, toggleLoading } from '../actions/authActions';

export const RequireAuth = (Component, socket) => {

	class RequireAuthHoC extends React.Component {
		componentDidMount() {
			socket.on("verifyTokenSuccess", this.props.verifyTokenSuccess);
			socket.on("verifyTokenError", this.props.verifyTokenError);
			const token = localStorage.getItem("token");
			this.props.verifyToken(socket, token);
		}

		componentWillUnmount() {
			socket.on("verifyTokenSuccess", this.props.verifyTokenSuccess);
			socket.on("verifyTokenError", this.props.verifyTokenError);
		}

		render() {
			if(!this.props.auth.loaded) {
				return <p>Loading...</p>;
			}

			if(this.props.auth.verifyTokenError.error) {
				return <Redirect to="/login"/>;
			}

			return <Component {...this.props} socket={socket}/>;
		}
	}

	const mapStateToProps = state => {
		return {
			auth: state.auth
		};
	};
	
	return connect(mapStateToProps, { verifyToken, verifyTokenSuccess, verifyTokenError, toggleLoading })(RequireAuthHoC);
};

export const NoRequireAuth = (Component, socket) => {

	class NoRequireAuthHoC extends React.Component {
		render() {
			return <Component {...this.props} socket={socket}/>;
		}
	}

	return NoRequireAuthHoC;

};