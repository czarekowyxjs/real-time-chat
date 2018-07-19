import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { userRequireAuth, userNoRequireAuth } from '../actions/authActions';

export const RequireAuth = (Component) => {

	class RequireAuthHoC extends React.Component {

		componentDidMount() {
			const token = localStorage.getItem("token");

			this.props.userRequireAuth(token);
		}

		render() {
			if(!this.props.auth.loaded) {
				return <p>Loading your data...</p>;
			}	

			if(this.props.auth.authError.status) {
				return <Redirect to="/login"/>;
			}

			return <Component {...this.props}/>;
		}
	}

	const mapStateToProps = state => {
		return {
			auth: state.auth
		};
	};
	
	return connect(mapStateToProps, { userRequireAuth })(RequireAuthHoC);
};

export const NoRequireAuth = (Component, socket) => {

	class NoRequireAuthHoC extends React.Component {
		componentDidMount() {
			const token = localStorage.getItem("token");
			this.props.userNoRequireAuth(token);
		}

		render() {
			if(!this.props.auth.loaded) {
				return <p>Loading your data...</p>;
			}

			if(!this.props.auth.authError.status) {
				return <Redirect to="/"/>;
			}

			return <Component {...this.props}/>;
		}
	}

	const mapStateToProps = state => {
		return {
			auth: state.auth
		};
	};

	return connect(mapStateToProps, { userNoRequireAuth })(NoRequireAuthHoC);

};