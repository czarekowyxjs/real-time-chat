import React from 'react';
import { Link } from 'react-router-dom';

import "./MainWindow.css";

class MainWindow extends React.Component {
	render() {
		return (
			<div className="window-wrapper">
				<div className="main-win-opts">
					<div className="main-win-btn-wr">
						<Link to="/join">
							<button type="submit" className="btn btn-green">Join to room</button>
						</Link>
					</div>
					<div className="main-win-btn-wr">
						<p>or</p>
					</div>
					<div className="main-win-btn-wr">
						<Link to="/create">
							<button type="submit" className="btn btn-green">Create room</button>
						</Link>					
					</div>
				</div>
			</div>
		);
	}
}

export default MainWindow;