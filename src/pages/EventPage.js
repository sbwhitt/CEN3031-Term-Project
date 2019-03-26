import React, { Component } from 'react';
import Modal from './Modal.js';

var testArr = [
  {eventName: "meet and greet", eventType: "social " + "event", points: 1, date: "2019-04-01", timestart: "16:00", timeend: "16:45", location: "Marston", description: "meet peeps"},
  {eventName: "office meeting", eventType: "business talk " + "event", points: 2, date: "2019-05-01", timestart: "15:00", timeend: "16:45", location: "Library west", description: "discuss business stuff"},
  {eventName: "need money", eventType: "fundraising " + "event", points: 3, date: "2019-04-05", timestart: "16:10", timeend: "16:35", location: "space", description: "make money"}
];
const EvenItem = (props) => {
	return (
    <div className="member-container">
        <div className="member-card">
          <div className="member-text">
            <h2>{props.item.eventName}</h2>
			<h4>{props.item.eventType} {props.item.points}</h4>
			<h4>{props.item.date} {props.item.timestart} {props.item.timeend}</h4>
			<h4>{props.item.location}</h4>
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
		isOpen: false
	}
}
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
		  <button onClick = {(e) => this.setState({isOpen: true})} className="event-button"> "create a new event" </button>
		  <Modal isOpen = {this.state.isOpen} onClose={(e) => this.setState({isOpen: false})}/>
          
		  <hr className="page-divider"/>
		  <h1 className="page-text" className = "page-centertext"> Upcoming Events</h1>
          {this._renderItems(testArr)}
		
		</div>
      </div>
    );
  }
}

export default EventPage;