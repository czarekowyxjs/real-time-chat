import React from 'react';

import "./Error.css";

class Error extends React.Component {
	constructor(props) {
		super(props);

		this.handleBackBtn = this.handleBackBtn.bind(this);
	}

	handleBackBtn() {
		this.props.history.goBack();
	}

	render() {
		return (
			<div className="error-root">
				<div className="error-wrapper">
					<div className="error-title">
						<h1>Error</h1>
					</div>
					<div className="error-body">
						<p>{this.props.err.message}</p>
					</div>
					<div className="error-back">
						<button type="submit" onClick={this.handleBackBtn}>Back</button>
					</div>
				</div>
			</div>
		);
	}
}

export default Error;