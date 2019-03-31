import React, { Component } from 'react';
import ManagementDashboard from './ManagementDashboard.js';

var memberNames = ["smiegel","boy", "death"];
var executiveNames = ["john", "coold dud", "smel"];


class ManageExecutivesPage extends Component {
  constructor(props) {
    super(props);
    this.state = {}
}
makeTable(arrayNames) {
	var table = [];
	for (let i = 0; i < arrayNames.length; i++) {
		table.push(<option> {arrayNames[i]} </option>)
	}
	return table;
}
  render() {
    return (

      <div className="page-wrapper">
        <div className="page-content">
          <h1 className="page-text">Executive Management</h1>
          <hr className="page-divider"/>
		  <ManagementDashboard/>
          <h2 className="page-text">Current Executives</h2>
		  <select name="Executives" > 
			<option value="" selected disabled hidden>Executives</option>
			{this.makeTable(executiveNames)}
		  </select>
		  <br/>
		  <input type="submit" value="Demote Executive"/>

		  <h2 className="page-text">Current Members</h2>
		  <select name="Members">
			<option value="" selected disabled hidden>Members</option>
			{this.makeTable(memberNames)}
		  </select>
		  <br/>
		  <input type="submit" value="Promote to Executive"/>
        </div>
      </div>
    );
  }
}

export default ManageExecutivesPage;