import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { logout, logoutSuccess } from '../../actions/authActions';

class Logout extends React.Component {
	componentDidMount() {
		console.log('Logout - DidMount');
		const token = localStorage.getItem("token");

		this.props.socket.on("logoutSuccess", this.props.logoutSuccess);
		this.props.logout(this.props.socket, token);
	}

	componentWillUnmount() {
		this.props.socket.removeListener("logoutSuccess", this.props.logoutSuccess);
	}

	render() {
		if(!this.props.auth.logged) {
			return <Redirect to="/login"/>;
		}

		return null;
	}
}

const mapStateToProps = state => {
	return {
		auth: state.auth
	};
};

export default connect(mapStateToProps, { logout, logoutSuccess })(Logout);