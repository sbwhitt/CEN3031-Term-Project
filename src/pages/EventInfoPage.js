import React, { Component } from 'react';
import EditEventForm from '../components/EditEventForm.js';
import axios from 'axios';

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

class EventInfoPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentEvent: {},
      isFormOpen: false,
    }
  }

  //called when profile page initially loaded
  componentDidMount() {
    const target = this.props.location.pathname.split("/")[2];
    this._getEvent(target);
  }

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

    const editButton = this.props.currentUser.isAdmin ? 
      <button className="manage-btn" style={{height: "3.5em", marginTop: "1.25em", marginRight: "5%"}}
        onClick={() => this.setState({isFormOpen: !this.state.isFormOpen})}>Edit Event</button> : null;

    const editForm = this.props.currentUser.isAdmin ?
      <div style={this.state.isFormOpen ? {} : {display: "none"}}>
        <hr className="page-divider"/>
        <div style={{marginLeft: "5%"}}><EditEventForm isFormOpen={this.state.isFormOpen} currentEvent={this.state.currentEvent}/></div>
      </div> : null;
    
    const signupButton = this.state.currentEvent.attended?
    (this.state.currentEvent.attended.includes(this.props.currentUser.email) ? <div style = {{textAlign: "right", marginRight: "5%"}}>"You already signed up"</div>:<p>"you can signup"</p>) : null;
    
    return (
      <div className="page-wrapper">
        <div className="page-content">
          <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between", marginLeft: "5%"}}>
            <h1>{this.state.currentEvent.name}</h1>
            {editButton}
          </div>
          {editForm}
          {this.props.currentUser ? signupButton:null}
          <hr className="page-divider"/>
          <div style={{marginLeft: "5%"}}>
            {this.state.currentEvent.location !== "" ? <p><b>Location: </b>{this.state.currentEvent.location}</p> : null}
            {date.getDate() ? <p><b>Date: </b>{months[date.getMonth()]} {date.getDate()}, {date.getFullYear()}</p> : null}
            {date.getDate() ? <p><b>Time: </b>{date.getHours()}:{date.getMinutes() < 10 ? '0'+date.getMinutes() : date.getMinutes()}</p> : null}
          </div>
        </div>
      </div>
    );
  }
}

export default EventInfoPage;