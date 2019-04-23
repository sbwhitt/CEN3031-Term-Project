import React, { Component } from 'react';
import CreateEventForm from '../components/CreateEventForm.js';
import { Link } from "react-router-dom";
import axios from 'axios';

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const EventItem = (props) => {
  var date = new Date(props.item.date);
  var url = '/event/' + props.item._id;
	return (
    <Link className="event-container" to={{pathname: url}}>
      <div className="event-card">
        <div className="event-text">
          <h3>{props.item.name}</h3>
          {date.getDate() ? <p>{months[date.getMonth()]} {date.getDate()}, {date.getFullYear()} at {date.getHours()}:{date.getMinutes() === 0 ? '00' : date.getMinutes()}</p> : null}
        </div>
      </div>
    </Link>
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
  }

  getEvents = () => {
    fetch("/api/event/getEvents")
      .then(function(res) {
        return res.json();
      })
      .then((res) => {
        this.setState({ events: res.data });
      });
  };

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
    //createButton and createForm rendered based on executive status of current logged in user
    const createButton = this.props.currentUser.isExecutive ? 
      <button className="manage-btn" style={{height: "3.5em", marginTop: "1.25em", marginRight: "5%"}}
        onClick={() => this.setState({isFormOpen: !this.state.isFormOpen})}>Create Event</button> : null;

    const createForm = this.props.currentUser.isExecutive ?
      <div style={this.state.isFormOpen ? {} : {display: "none"}}>
        <hr className="page-divider"/>
        <div style={{marginLeft: "5%"}}>
          <CreateEventForm isFormOpen={this.state.isFormOpen}/>
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