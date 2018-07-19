import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { executeLogout } from '../../actions/logoutActions';

class Logout extends React.Component {
	componentDidMount() {
		const token = localStorage.getItem("token");
		this.props.executeLogout(token);
	}

	render() {
		if(this.props.logout.loaded) {
			return <Redirect to="/login"/>;
		}
		return null;
	}
}

const mapStateToProps = state => {
	return {
		auth: state.auth,
		logout: state.logout,
		user: state.user
	};
};

export default connect(mapStateToProps, { executeLogout })(Logout);