import React, { Component } from 'react';
import axios from 'axios';

class EventInfoPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentEvent: {},
    }
  }

  //called when profile page initially loaded
  //grabs member name from url and sends it to the backend to fetch the profile data
  componentDidMount() {
    const target = this.props.location.pathname.split("/")[2];
    this._getEvent(target);
  }

  //fetches profile object data based on target from db
  _getEvent = (target) => {
    axios.get("/api/event/getEvent/", {
      params: {
        _id: target,
      }
    }).then((res) => {
      if (res.data) this.setState({ currentEvent: res.data });
    });
  }

  render() {
    return (
      <div className="page-wrapper">
        <div className="page-content">
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div style={{ display: "flex", flexDirection: "column", marginLeft: "5%", width: "600px" }}>
              <h1>{this.state.currentEvent.name}</h1>
            </div>
          </div>
          <hr className="page-divider"/>
        </div>
      </div>
    );
  }
}

export default EventInfoPage;