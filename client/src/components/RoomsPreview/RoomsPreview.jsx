import React from 'react';
import RoomsPreviewItem from './RoomsPreviewItem.jsx';

import "./RoomsPreview.css";

class RoomsPreview extends React.Component {
	constructor(props) {
		super(props);

		this.props.socket.on('allUserRooms', data => {
			this.props.methods.updateRoomsList(data.rooms);
		});

		this.renderAllRooms = this.renderAllRooms.bind(this);
	}

	componentDidMount() {
		this.props.socket.emit('getAllRooms', {
			uid: this.props.user.uid
		});
	}

	renderAllRooms() {
		const rooms = this.props.rooms;

		return rooms.map((key, index) => {
			return <RoomsPreviewItem key={key.rid} roomData={key}/>;
		});
	}

	render() {
		return (
			<div className="rooms-preview">
				<div className="rooms-preview-title">
					<h4>Your rooms</h4>
				</div>
				<div className="rooms-preview-body">
					{this.renderAllRooms()}
					{this.props.rooms.length < 1 
						? (<div className="rooms-preview-empty">
								<p>You are not in any room</p>
							</div>) : null}
				</div>
			</div>
		);
	}
}

export default RoomsPreview;