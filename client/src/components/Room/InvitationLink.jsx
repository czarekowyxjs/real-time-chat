import React from 'react';
import config from '../../config/config';

import "./InvitationLink.css";

class InvitationLink extends React.Component {
	render() {
		return (
			<div className="invitation-link-wrapper">
				<div>
					<h4>Invitation link for this group</h4>
					<input 
						type="text" 
						disabled={true} 
						className="default-input"
						value={`${config.host}/join/${this.props.rid}`}
					/>
					<p>You can send this link to people which you want to invite to this group. Remember about password :)</p>
					<div className="btn-wrapper">
						<button type="submit" className="btn btn-green" onClick={this.props.close}>Close</button>
					</div>
				</div>
			</div>
		);
	}
}

export default InvitationLink;