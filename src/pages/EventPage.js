import React, { Component } from 'react';
import axios from "axios";

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const EventItem = (props) => {
  var date = new Date(props.item.date);
	return (
    <div className="event-container" style={{display: "grid"}}>
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
      currentQuery: ""
	  }
  }

  componentDidMount() {
    this.getEvents();
  }

  getEvents = () => {
    fetch("http://localhost:8080/api/event/getEvents")
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
        {/*props.map((item, index) => (
          <EventItem item={item} index={index}/>
        ))*/}
        {this.state.events.filter((item) => this.state.currentQuery === "" || 
          (item.name).toLowerCase().includes(this.state.currentQuery.toLowerCase()))
          .map((item, index) => (
            <EventItem item={item} key={index} index={index}/>
        ))}
      </div>
    );
  }

  postTest() {
    axios.post("/api/createMember", {
      firstName: "one",
      lastName: "two"
    });
  }

  render() {
    return (
      <div className="page-wrapper">
        <div className="page-content">
          <button onClick={() => this.postTest()}>post</button>
          <h1 className="page-text">Events</h1>
          <hr className="page-divider"/>
          <EventSearch onChange={(e) => this._onSearchChange(e)}/>
          {this._renderEvents(this.state.members, this.state.currentQuery)}
        </div>
      </div>
    );
  }
}

export default EventPage;