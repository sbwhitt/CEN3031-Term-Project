import React, { Component } from 'react';
import ManagementDashboard from './HelperComponents/ManagementDashboard';

class ManagementPage extends Component{
	constructor(props) {
		super(props);
		this.state = {}
	}
	
	render() {
		return (
			<div className="page-wrapper">
				<div className="page-content">
					<h1 className="page-text">Management</h1>
					<hr className="page-divider"/>
					<ManagementDashboard/>
				</div>
			</div>	
		);
	}
}

export default ManagementPage;