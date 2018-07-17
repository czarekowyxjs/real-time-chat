import React from 'react';
import { connect } from 'react-redux';
import { verifyToken, verifyTokenSuccess } from '../actions/authActions';

export const RequireAuth = (Component, socket) => {

	class RequireAuthHoC extends React.Component {
		componentDidMount() {
			socket.on("verifyTokenSuccess", this.props.verifyTokenSuccess);
			const token = localStorage.getItem("token");
			this.props.verifyToken(socket, token);
		}

		componentWillUnmount() {

		}

		render() {
			return <Component {...this.props} />;
		}
	}
	
	return connect(null, { verifyToken, verifyTokenSuccess })(RequireAuthHoC);
};