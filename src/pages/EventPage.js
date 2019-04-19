import React, { Component } from 'react';
import EventForm from '../components/EventForm.js';
import passport from 'passport';

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const EventItem = (props) => {
  var date = new Date(props.item.date);
	return (
    <div className="event-container">
      <div className="event-card">
        <div className="event-text">
          <h2>{props.item.name}</h2>
          <h4>{props.item.location}</h4>
          <h4>{props.item.date}</h4>
          <h4>{months[date.getMonth()]} {date.getDate()}, {date.getFullYear()}</h4>
          <p>{props.item.description}</p>
        </div>
      </div>
    </div>
	);
}

const EventSearch = (props) => {
  return (
    <div className="search-container">
      <input className="search-bar" onChange={props.onChange} placeholder="Search for events here..."/>
    </div>
  );
}

class EventPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      currentQuery: "",
      isLoggedIn: false,
      isFormOpen: false,
	  }
  }

  componentDidMount() {
    this._getEvents();
    this._checkLogInStatus();
  }

  _getEvents = () => {
    fetch("/api/event/getEvents")
      .then(function(res) {
        return res.json();
      })
      .then((res) => {
        this.setState({ events: res.data });
      });
  };

  _checkLogInStatus = () => {
    const token = localStorage.getItem("jwt");
    if (token) this.setState({isLoggedIn: true});
  }

  _onSearchChange = (e) => {
    this.setState({currentQuery: e.target.value});
  }

  _renderEvents = (props) => {
    return (
      <div className="grid-container">
        {this.state.events.filter((item) => this.state.currentQuery === "" || 
          (item.name).toLowerCase().includes(this.state.currentQuery.toLowerCase()))
          .map((item, index) => (
            <EventItem item={item} key={index} index={index}/>
        ))}
      </div>
    );
  }

  render() {
    const createButton = this.state.isLoggedIn ? 
      <button className="manage-btn" style={{height: "3.5em", marginTop: "1.25em", marginRight: "5%"}}
        onClick={() => this.setState({isFormOpen: !this.state.isFormOpen})}>Create Event</button> : null;

    const createForm = this.state.isFormOpen ?
      <div>
        <hr className="page-divider"/>
        <div style={{marginLeft: "5%"}}>
          <EventForm isFormOpen={this.state.isFormOpen}/>
        </div>
      </div> : null;

    return (
      <div className="page-wrapper">
        <div className="page-content">
          <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
            <h1 className="page-text">Events</h1>
            {createButton}
          </div>
          {createForm}
          <hr className="page-divider"/>
          <EventSearch onChange={(e) => this._onSearchChange(e)}/>
          {this._renderEvents(this.state.members, this.state.currentQuery)}
        </div>
      </div>
    );
  }
}

export default EventPage;