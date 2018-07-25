import React from 'react';
import { Redirect } from 'react-router-dom';

class RoomBroker extends React.Component {
	render() {
		const rid = this.props.match.params.rid;
		return <Redirect to={`/room/${rid}`}/>;
	}
}

export default RoomBroker;