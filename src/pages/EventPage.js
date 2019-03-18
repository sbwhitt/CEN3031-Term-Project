import React, { Component } from 'react';

class EventPage extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

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