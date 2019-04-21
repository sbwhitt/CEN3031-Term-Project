import React, { Component } from 'react';
import axios from 'axios';

class EventForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: "",
      points: 0,
      name: "",
      date: "",
      start: "",
      duration: "",
      location: "",
      description: "",
    }
  }

  componentWillReceiveProps(props, state) {
    const date = new Date(props.currentEvent.date);
    const dateStr = date.getFullYear().toString() + '-' + ("0" + (date.getMonth()+1)).slice(-2) + 
      '-' + ("0" + (date.getDate())).slice(-2)
    const timeStr = (date.getHours() < 10 ? '0'+date.getHours() : date.getHours()) + 
      ':' + (date.getMinutes() < 10 ? '0'+date.getMinutes() : date.getMinutes());

    this.setState({
      category: props.currentEvent.category,
      points: props.currentEvent.points,
      name: props.currentEvent.name,
      date: dateStr,
      start: timeStr,
      duration: props.currentEvent.duration,
      location: props.currentEvent.location,
      description: props.currentEvent.description,
    });
  }

  //sends form data to db to create new event
  _updateEvent = () => {
    console.log(this.props.currentEvent);
    var date = this.state.date + 'T' + this.state.start;
    axios.post("/api/event/updateEvent", {
      id: this.props.currentEvent._id,
      update: {
        name: this.state.name,
        category: this.state.category,
        points: this.state.points,
        date: date,
        duration: this.state.duration,
        location: this.state.location,
        description: this.state.description,
      }
    });
  }

  render() {
    return (
      <div style={this.props.isFormOpen ? {} : { display: "none" }} className="event-modal">
      <button onClick={this._updateEvent}>test</button>
        <form onSubmit={this._updateEvent}>
          <label htmlFor="categories">Select Category: </label>
          <select name="categories" value={this.state.category}
            onChange={(e) => this.setState({ category: e.target.value })}>
            <option value="Social">Social</option>
            <option value="Info Session">Info Session</option>
            <option value="Fundraiser">Fundraiser</option>
            <option value="Outreach">Outreach</option>
            <option value="Email Outreach">Email Outreach</option>
            <option value="Miscellaneous">Miscellaneous</option>
          </select>
          <br />

          <label htmlFor="points">Points: </label>
          <input value={this.state.points} type="number" id="points" required onChange={(e) => this.setState({points: e.target.value})} />
          <br />

          <label htmlFor="eventName"> Event Name: </label >
          <input value={this.state.name} type="text" id="eventName" required onChange={(e) => this.setState({ name: e.target.value })} />
          <br />

          <label htmlFor="date">Date: </label>
          <input value={this.state.date} type="date" id="date" required onChange={(e) => this.setState({ date: e.target.value })} />
          <br />

          <label htmlFor="timeStart">Start Time: </label>
          <input value={this.state.start} type="time" id="timeStart" required onChange={(e) => this.setState({ start: e.target.value })} />
          <br />
          <label htmlFor="timeEnd">Duration (Hours): </label>
          <input value={this.state.duration} type="number" id="duration" required onChange={(e) => this.setState({ duration: e.target.value })} />
          <br />

          <label htmlFor="location">Location: </label>
          <input value={this.state.location} type="text" id="location" required onChange={(e) => this.setState({ location: e.target.value })} />
          <br />

          <label htmlFor="description">Description(optional):</label>
          <br />
          <textarea value={this.state.description} name="Description" id="description" rows="8" cols="40"
            onChange={(e) => this.setState({ description: e.target.value })}>
          </textarea>
          <br />
          <input type="submit" onClick={this._updateEvent} className="manage-btn" value="Update Event"/>
        </form>
      </div>
    );
  }
}

export default EventForm;