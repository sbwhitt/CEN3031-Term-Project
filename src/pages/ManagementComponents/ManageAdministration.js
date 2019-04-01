import React, { Component } from 'react';

var executiveNames = ["john", "coold dud", "smel"];

class ManageAdministration extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isAdministrationOpen:false
		}
	}
	makeTable(arrayNames) {
		var table = [];
		for (let i = 0; i < arrayNames.length; i++) {
			table.push(<option> {arrayNames[i]} </option>)
		}
		return table;
		}
	render() {
		let ManageAdministration = (
			<div>
				<h1 className="page-text">Administration</h1>
				<hr className="page-divider"/>
				<h2 className="page-text">Current Executives</h2>
				<div style={{marginLeft: "5%"}}>
					<select name="Executives" > 
						<option value="" selected disabled hidden>Executives</option>
						{this.makeTable(executiveNames)}
					</select>
					<br/>
					<input type="submit" value="Promote Executive"/>
					<button> Demote Account to Executive Level</button>
				</div>
			</div>
		)
		
		if (!this.props.isAdministrationOpen) {
			ManageAdministration = null;
		}
		
		return (
			<div>
				{ManageAdministration}
			</div>
		);
	}
}

export default ManageAdministration;