import React, { Component } from 'react';
import axios from 'axios';

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

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
    var date = new Date(this.state.currentEvent.date);
    return (
      <div className="page-wrapper">
        <div className="page-content">
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div style={{ display: "flex", flexDirection: "column", marginLeft: "5%", width: "600px" }}>
              <h1>{this.state.currentEvent.name}</h1>
            </div>
          </div>
          <hr className="page-divider"/>
          <div style={{marginLeft: "5%"}}>
            {this.state.currentEvent.location !== "" ? <p><b>Location: </b>{this.state.currentEvent.location}</p> : null}
            {date.getDate() ? <p><b>Date: </b>{months[date.getMonth()]} {date.getDate()}, {date.getFullYear()}</p> : null}
            {date.getDate() ? <p><b>Time: </b>{date.getUTCHours()}:{date.getMinutes() === 0 ? '00' : date.getMinutes()}</p> : null}
          </div>
        </div>
      </div>
    );
  }
}

export default EventInfoPage;