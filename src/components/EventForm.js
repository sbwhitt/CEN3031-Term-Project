import React, { Component } from 'react';
import axios from 'axios';

class EventForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
      category: "Social",
      points: 0,
      name: "",
      date: "",
      start: "",
      duration: "",
      location: "",
      description: "",
    }
  }

	//sends form data to db to create new event
  _createEvent = () => {
    var date = this.state.date + 'T' + this.state.start;
    axios.post("/api/event/createEvent", {
      name: this.state.name,
      category: this.state.category,
      points: this.state.points,
      date: date,
      duration: this.state.duration,
      location: this.state.location,
      description: this.state.description,
    });
  }
  
	render() {	
		return (
			<div style={this.props.isFormOpen ? {} : {display: "none"}} className="event-modal">
				<form>
          <label htmlFor="categories">Select Category: </label>
					<select name="categories" defaultValue="Social"
            onChange={(e) => this.setState({category: e.target.value})}>
						<option value="Social">Social</option>
						<option value="Info Session">Info Session</option>
						<option value="Fundraiser">Fundraiser</option>
						<option value="Outreach">Outreach</option>
						<option value="Email Outreach">Email Outreach</option>
						<option value="Miscellaneous">Miscellaneous</option>
					</select>
          <br/>

					<label htmlFor="points">Points: </label>
					<input type="number" id="points" required onChange={(e) => this.setState({points: e.target.value})}/>
          <br/>
					
					<label htmlFor="eventName"> Event Name: </label >
					<input type="text" id="eventName" required onChange={(e) => this.setState({name: e.target.value})}/>
					<br/>
					
					<label htmlFor="date">Date: </label>
					<input type="date" id="date" required onChange={(e) => this.setState({date: e.target.value})}/>
					<br/>
					
					<label htmlFor="timeStart">Start Time: </label>
					<input type="time" id="timeStart" required onChange={(e) => this.setState({start: e.target.value})}/>
          <br/>
					<label htmlFor="timeEnd">Duration (Hours): </label>
					<input type="number" id="duration" required onChange={(e) => this.setState({duration: e.target.value})}/>
					<br/>
					
					<label htmlFor="location">Location: </label>
					<input type="text" id="location" required onChange={(e) => this.setState({location: e.target.value})}/>
					<br/>
					
					<label htmlFor="description">Description(optional):</label>
					<br/>
					<textarea name="Description" id="description" rows="8" cols="40"
            onChange={(e) => this.setState({description: e.target.value})}>
          </textarea>
					<br/>
          <button onClick={this._createEvent} className="manage-btn">Create Event</button>
				</form>
			</div>
		);
	}
}

export default EventForm;