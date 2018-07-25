import React from 'react';
import { Link } from 'react-router-dom';

class RoomsPreviewItem extends React.Component {
	render() {
		const roomData = this.props.roomData;
		return (
			<div className="rooms-preview-item">
				<div className="rooms-preview-item-wrapper">
					<div className="rooms-preview-item-title">
						<p>{roomData.Room.room_name}</p>
					</div>
					<div className="rooms-preview-item-enter">
						<Link to={`/broker/room/${roomData.Room.rid}`}>Enter</Link>
					</div>
				</div>
			</div>
		);
	}
}

export default RoomsPreviewItem;