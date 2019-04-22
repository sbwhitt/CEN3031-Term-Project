import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import EditEventForm from '../components/EditEventForm.js';
import async from 'async';
import axios from 'axios';

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const AttendeeItem = (props) => {
  return (
    <Link to={{pathname: "/profile/" + props.first + props.last}} className="event-container">
      <div className="event-text">
        <h3>{props.first} {props.last}</h3>
        <p>{props.email}</p>
      </div>
    </Link>
  );
}

class EventInfoPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentEvent: {},
      isFormOpen: false,
      attendees: [],
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
      if (res.data) {
        this.setState({ currentEvent: res.data }, () => this._getProfiles());
      }
    });
  }

  _getProfiles = () => {
    axios.get("/api/member/profiles", {
      params: {
        attended: this.state.currentEvent.attended
      }
    }).then((res) => {
      this.setState({attendees: res.data});
    });
  }

  _onSignUp = () => {
    this.state.currentEvent.attended.push(this.props.currentUser.email);
    this._updateAttended();
    this._getProfile();
  }

  _updateAttended = () => {
    axios.post("/api/event/updateEvent", {
      id: this.state.currentEvent._id,
      update: {
        attended: this.state.currentEvent.attended
      }
    });
  }

  _getProfile = () => {
    axios.get("/api/member/profile", {
      params: {
        email: this.props.currentUser.email
      }
    }).then((res) => {
      this._updateToAttend(res.data);
    }).then(() => window.location.reload());
  }

  _updateToAttend = (profile) => {
    var toAttend = profile.toAttend;
    console.log(toAttend);
    toAttend.push({
      eventId: this.state.currentEvent._id,
      eventPoints: this.state.currentEvent.points,
    });
    axios.post("/api/member/updateMember", {
      id: profile._id,
      update: {
        toAttend: toAttend
      }
    });
  }

  /*_updatePoints = (profile) => {
    const points = profile.points + this.state.currentEvent.points;
    axios.post("/api/member/updateMember", {
      id: profile._id,
      update: {
        points: points
      }
    });
  }*/

  _renderAttendees = (props) => {
    return (
      <div className="grid-container">
        {this.state.attendees ? this.state.attendees.map((item, index) => (
          <AttendeeItem first={item.firstName} last={item.lastName} email={item.email} key={index}/>
        )) : null}
      </div>
    );
  }

  _markEventCompleted = () => {
    const confirmed = window.confirm("Are you sure you would like to mark this event as complete? (This will delete the event and add its points to all attended members)");
    if (confirmed) {
      console.log(true);
    }
    else {
      console.log(false);
    }
  }

  _onDeleteEvent = () => {
    const confirmed = window.confirm("Are you sure you would like to permanently delete this event? (No points will be added to users)");
    if (confirmed) {
      this._removeFromAttended(this.state.currentEvent.attended);
    }
  }

  _removeFromAttended = (attended) => {
    async.eachSeries(attended, (email, callback) => {
      axios.get("/api/member/profile", {
        params: {
          email: email
        }
      }).then((res) => {
        var toAttend = res.data.toAttend;
        var index;
        for (var i = 0; i < toAttend.length; i++) {
          if (toAttend[i].eventId === this.state.currentEvent._id) {
            index = i;
            break;
          }
        }
        toAttend.splice(index, 1);
        axios.post("/api/member/updateMember", {
          id: res.data._id,
          update: {
            toAttend: toAttend
          }
        });
      }).then(() => callback(null));
    }, (err) => {
      if (err) throw err;
      else this._deleteEvent();
    });
    
  }

  /*****
   * TODO: THIS MUST REMOVE THE EVENT FROM THE USERS SHCEMAS WHEN IT DELETES
  *****/
  _deleteEvent = () => {
    axios.delete("/api/event/deleteEvent", {
      data: {
        _id: this.state.currentEvent._id,
      }
    }).then(() => window.location.replace("/events"));
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
    
    const signupButton = this.state.currentEvent.attended ?
      (this.state.currentEvent.attended.includes(this.props.currentUser.email) ? null : 
        <button className="manage-btn" onClick={this._onSignUp}> Sign up</button>) : null;

    const signupMsg = this.state.currentEvent.attended ? 
      (this.state.currentEvent.attended.includes(this.props.currentUser.email) ? <b>You are signed up to attend this event!</b> : null) : null

    const attendeeList = this.props.currentUser.isAdmin ? 
      <div>
        <h1 style={{marginLeft: "5%"}}>Attendees</h1>
        <hr className="page-divider"/>
        {this.state.currentEvent.attended && this.state.currentEvent.attended[0] ? 
          this._renderAttendees(this.state.currentEvent.attended) : 
            <b style={{marginLeft: "5%"}}>No one is currently signed up to attend this event.</b>}
      </div> : null;

    const eventManagement = this.props.currentUser.isAdmin ? 
      <div className="event-btn-container">
        <button className="manage-btn" onClick={this._markEventCompleted}>Mark Completed</button>
        <button className="manage-btn" onClick={this._onDeleteEvent}>
          Delete Event</button>
      </div> : null;
    
    return (
      <div className="page-wrapper">
        <div className="page-content">
          <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between", marginLeft: "5%"}}>
            <h1>{this.state.currentEvent.name}</h1>
            <div style={{display:"flex", flexDirection: "column",marginRight: "5%"}}>
            {editButton}
            {this.props.currentUser.email ? signupButton:null}
            </div>
          </div>
          {editForm}
          <hr className="page-divider"/>
          <div style={{marginLeft: "5%"}}>
            {this.state.currentEvent.location !== "" ? <p><b>Location: </b>{this.state.currentEvent.location}</p> : null}
            {date.getDate() ? <p><b>Date: </b>{months[date.getMonth()]} {date.getDate()}, {date.getFullYear()}</p> : null}
            {date.getDate() ? <p><b>Time: </b>{date.getHours()}:{date.getMinutes() < 10 ? '0'+date.getMinutes() : date.getMinutes()}</p> : null}
            {signupMsg}
          </div>
          {attendeeList}
          {eventManagement}
        </div>
      </div>
    );
  }
}

export default EventInfoPage;