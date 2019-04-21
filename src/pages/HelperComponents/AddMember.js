import React, { Component } from 'react';

class AddMember extends Component {
	constructor(props) {
		super(props);
		this.state = {}
  }
  
	render() {	
		return (
			<div style={this.props.isFormOpen ? {} : {display: "none"}}>
				<form>
					<label for="firstName">Points: </label>
					<input type="text" id="firstName" required/>
					
					<label for="lastName"> Event Name: </label >
					<input type="text" id="lastName" required/>
					<br/>
					
					<label for="programs">Date:</label>
					<input type = "text" id="programs" required/>
					<br/>

                    <label for="majors:">Date:</label>
					<input type = "text" id="majors" required/>
					<br/>

                    <label for="minors:">Date:</label>
					<input type = "text" id="minors"/>
					<br/>

                    <label for="email:">Date:</label>
					<input type = "text" id="email" required/>
					<br/>

					<input type="submit" value="Add Member"/>
				</form>
			</div>
		);
	}
}

export default AddMember;