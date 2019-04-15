import React, { Component } from 'react';
import EventForm from './HelperComponents/EventForm.js';

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
      isFormOpen: false,
	  }
  }

  componentDidMount() {
    this.getEvents();
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
    return (
      <div className="page-wrapper">
        <div className="page-content">
          <div style={{display: "flex", flexDirection: "row"}}>
            <h1 className="page-text">Events</h1>
            <button className="manage-btn" style={{height: "4em", marginTop: "1em", marginRight: "5%"}}
              onClick={() => this.setState({isFormOpen: !this.state.isFormOpen})}>Create New Event</button>
          </div>
          <div style={this.state.isFormOpen ? {} : {display: "none"}}>
            <hr className="page-divider"/>
            <div style={{marginLeft: "5%"}}>
              <EventForm isFormOpen={this.state.isFormOpen}/>
            </div>
          </div> 
          <hr className="page-divider"/>
          <EventSearch onChange={(e) => this._onSearchChange(e)}/>
          {this._renderEvents(this.state.members, this.state.currentQuery)}
        </div>
      </div>
    );
  }
}

export default EventPage;