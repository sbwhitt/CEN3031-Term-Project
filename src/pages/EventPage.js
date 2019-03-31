import React, { Component } from 'react';

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
  fetch("http://localhost:8080/api/event/getEvents")
    .then(function(res) {
      return res.json();
    })
    .then((res) => {
      this.setState({ events: res.data }, () => console.log(this.state.events));
    });
};

  render() {
    return (
      <div className="page-wrapper">
        <div className="page-content">
          <h1 className="page-text">Events</h1>
          <hr className="page-divider"/>
          <p className="page-text">Events.</p>
        </div>
      </div>
    );
  }
}

export default EventPage;