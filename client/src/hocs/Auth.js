import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { verifyToken, verifyTokenSuccess, verifyTokenError } from '../actions/authActions';

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
			if(this.props.auth.verifyTokenError.error) {
				return <Redirect to="/login"/>;
			}
			return <Component {...this.props} />;
		}
	}

	const mapStateToProps = state => {
		return {
			auth: state.auth
		};
	};
	
	return connect(mapStateToProps, { verifyToken, verifyTokenSuccess, verifyTokenError })(RequireAuthHoC);
};