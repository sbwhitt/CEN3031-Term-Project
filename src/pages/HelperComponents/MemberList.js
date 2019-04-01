import React, { Component } from 'react';



class MemberList extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			size: 0
		}
	}
	
	makeTable = (props) => {
	var table = [];
	for (let i = 0; i < 3; i++) {
		table.push(<option> {props.arrayNames[i]} </option>)
	}
	return table;
	}
	
	render() {
		return(
		<div>
		var j ={this.props.arrayNames.length}
		<select name="Executives" >
			<option value="" selected disabled hidden>{this.props.listName}</option>
				
		</select>

		<br/>
		<input type="submit" value="Demote Executive"/>
		</div>
		);
	}
}

export default MemberList;