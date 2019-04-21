import React, { Component } from 'react';
import EventForm from '../components/EventForm.js';
import axios from 'axios';

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
      currentUser: {},
      isFormOpen: false,
	  }
  }

  //called when event page initially loaded
  //grabs all events from db and checks the current login status through jwt
  componentDidMount() {
    this._getEvents();
    this._checkLogInStatus();
  }

  //returns list of all events from db
  _getEvents = () => {
    fetch("/api/event/getEvents")
      .then(function(res) {
        return res.json();
      })
      .then((res) => {
        this.setState({ events: res.data });
      });
  };

  //checks if a jwt is present
  //if jwt exists, loads token and sends it to backend for decodeing
  //on successful decode, takes payload and puts it into this.state.currentUser
  _checkLogInStatus = () => {
    if (localStorage.jwt) {
      const token = localStorage.getItem("jwt");
      axios.post("/api/auth/decode", {token: token}).then((res) => {
        if (res.data) this.setState({currentUser: res.data.data});
      });
    }
  }

  //called if searchbar input changes
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
    //createButton and createForm rendered based on admin status of current logged in user
    const createButton = this.state.currentUser.isAdmin ? 
      <button className="manage-btn" style={{height: "3.5em", marginTop: "1.25em", marginRight: "5%"}}
        onClick={() => this.setState({isFormOpen: !this.state.isFormOpen})}>Create Event</button> : null;

    const createForm = this.state.currentUser.isAdmin ?
      <div style={this.state.isFormOpen ? {} : {display: "none"}}>
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