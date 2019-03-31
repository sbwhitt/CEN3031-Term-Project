import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import ManageMembersPage from './ManageMembersPage.js';
import ManageExecutivesPage from './ManageExecutivesPage.js';
import AdministratorChangePage from './AdministratorChangePage.js';

var manageMUrl = "/managemembers";
var manageEUrl = "/manageexecutives";
var manageAUrl = "/manageadministration";

class ManagementDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
	return(

	<div>
	    <table>
			<tr><Link to='/managemembers' link ='/managemembers'>Manage Members</Link></tr>
			<tr><Link to='/manageexecutives' link = '/manageexecutives'>Manage Executives</Link></tr>
			<tr><Link to='/manageadministration' link = '/manageadministration'>Manage Administration</Link></tr>
		</table>
	</div>

	);
  }
}

export default ManagementDashboard;