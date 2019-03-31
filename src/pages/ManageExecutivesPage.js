import React, { Component } from 'react';

var executiveNames = ["john", "coold dud", "smel"];
var memberNames = ["smiegel","boy", "death"];


class ManageExecutivesPage extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
	function renderNames(names) {
		var printNames =  names;
		 
	
	}
    return (
      <div className="page-wrapper">
        <div className="page-content">
          <h1 className="page-text">Executive Management</h1>
          <hr className="page-divider"/>
          <h2 className="page-text">Current Executives</h2>
		  <select name="Executives" > 
			<option value="" selected disabled hidden>Executives</option>
		  </select>
		  <br/>
		  <input type="submit" value="Demote Executive"/>
		  document.write(executiveNames[0]);
		  <h2 className="page-text">Current Members</h2>
		  <select name="Members">
			<option value="" selected disabled hidden>Members</option>
		  </select>
		  <br/>
		  <input type="submit" value="Promote to Executive"/>
        </div>
      </div>
    );
  }
}

export default ManageExecutivesPage;