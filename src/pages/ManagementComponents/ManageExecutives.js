import React, { Component } from 'react';

var memberNames = ["smiegel","boy", "death"];
var executiveNames = ["john", "coold dud", "smel"];

class ManageExecutives extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			isExecutivesOpen:false
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
		let ManageExecutives = (
			<div>
				<h1 className="page-text">Executives</h1>
				
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
	  	)
		
		if (!this.props.isExecutivesOpen) {
			ManageExecutives = null;
		}
		
		return (
			<div>
				{ManageExecutives}
			</div>
		);
	}
}

export default ManageExecutives;