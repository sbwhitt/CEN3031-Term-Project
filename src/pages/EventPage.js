import React, { Component } from 'react';

const EventItem = (props) => {
	return (
    <div className="member-container">
      <div className="member-card">
        <div className="member-text">
          <h2>{props.item.name}</h2>
          <h4>{props.item.location}</h4>
          <h4>{props.item.date}</h4>
          <p>{props.item.description}</p>
        </div>
      </div>
    </div>
	);
}
class EventPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
		  events: []
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
        this.setState({ events: res.data }, () => console.log(this.state.events));
      });
  };

  _renderItems = (props) => {
    return (
      <div>
        {props.map((item, index) => (
          <EventItem item={item} index={index}/>
        ))}
      </div>
    );
  }
  render() {
    return (
      <div className="page-wrapper">
        <div className="page-content">
          <h1 className="page-text">Events</h1>
          <hr className="page-divider"/>
          {this._renderItems(this.state.events)}
        </div>
      </div>
    );
  }
}

export default EventPage;