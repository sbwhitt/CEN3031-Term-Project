import React, { Component } from 'react';

class EventForm extends Component {
	constructor(props) {
		super(props);
		this.state = {}
  }
  
	render() {	
		return (
			<div style={this.props.isFormOpen ? {} : {display: "none"}} className="event-modal">
				<form>
					<select name="events">
						<option value="type"> Social </option>
						<option value="type"> Info Session </option>
						<option value="type"> Fundraiser </option>
						<option value="type"> Outreach </option>
						<option value="type"> Email Outreach </option>
						<option value="type"> Misc. </option>
					</select>
					<label for="points">Points: </label>
					<input type="number" value="1" id="points" required/>
					
					<label for="eventName"> Event Name: </label >
					<input type="text" id="eventName" required/>
					<br/>
					
					<label for="date">Date:</label>
					<input type = "date" id="date" required/>
					<br/>
					
					<label for="timeStart"> start time:</label>
					<input type = "time" id="timeStart" required/>
					<label for="timeEnd">end time:</label>
					<input type = "time" id="timeEnd" required/>
					<br/>
					
					<label for="location">Location:</label>
					<input type="text" id="location" required/>
					<br/>
					
					<label for="description">Description(optional):</label>
					<br/>
					<textarea name="Description" id="description" rows="8" cols="40"> </textarea>
					<br/>
					<input type="submit" value="create event"/>
				</form>
			</div>
		);
	}
}

export default EventForm;