import React, { Component } from 'react';

import ManageEvents from '../ManagementComponents/ManageEvents'
import ManageMembers from '../ManagementComponents/ManageMembers.js';
import ManageExecutives from '../ManagementComponents/ManageExecutives.js';
import ManageAdministration from '../ManagementComponents/ManageAdministration.js';

class ManagementDashboard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isEventsOpen:false,
			isMembersOpen:false,
			isExecutivesOpen:false,
			isAdministrationOpen:false
		}
	}
	render() {
		return(
			<div style={{marginLeft: "5%"}}>
				<button onClick = {(e) => this.setState({isEventsOpen:true, isMembersOpen:false, isExecutivesOpen:false, isAdministrationOpen:false})}> Manage Events </button>
				<br/>
				<button onClick = {(e) => this.setState({isMembersOpen:true, isEventsOpen:false, isExecutivesOpen:false, isAdministrationOpen:false})}> Manage Members </button>
				<br/>
				<button onClick = {(e) => this.setState({isExecutivesOpen:true, isEventsOpen:false, isMembersOpen:false, isAdministrationOpen:false})}> Manage Executives </button>
				<br/>
				<button onClick = {(e) => this.setState({isAdministrationOpen:true, isEventsOpen:false, isMembersOpen:false, isExecutivesOpen:false})}> Manage Administration </button>
				<br/>

				<ManageEvents isEventsOpen = {this.state.isEventsOpen}/>
				<ManageMembers isMembersOpen = {this.state.isMembersOpen}/>
				<ManageExecutives isExecutivesOpen = {this.state.isExecutivesOpen}/>
				<ManageAdministration isAdministrationOpen = {this.state.isAdministrationOpen}/>
			</div>
		);
	}
}

export default ManagementDashboard;