import React, { Component } from 'react';

class ManageMembers extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isMembersOpen:false
		}
	}
	render() {
		let ManageMembers = (
			<div>
				<h1 className="page-text">Members</h1>
				<p className="page-text">Member Management</p>
			</div> 
		)
		
		if (!this.props.isMembersOpen) {
			ManageMembers = null;
		}
		
		return (
			<div>
				{ManageMembers}
			</div>
		);
	}
}

export default ManageMembers;