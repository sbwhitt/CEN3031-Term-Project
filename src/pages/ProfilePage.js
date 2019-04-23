import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import ProfileEditForm from '../components/ProfileEditForm.js';
import QuestionForm from '../components/QuestionForm.js';
import async from 'async';
import axios from 'axios';

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const QuestionItem = (props) => {
  return (
    <div>
      <h2 className="page-text">{props.question}</h2>
      <p className="page-text">{props.answer}</p>
    </div>
  );
}

const InfoItem = (props) => {
  return (
    <div>
      <p className="data-block"><b>{props.data}</b>{props.item}</p>
    </div>
  );
}

const AttendItem = (props) => {
  var date = new Date(props.date);
  return (
    <Link to={{pathname: "/event/" + props.id}} className="event-container">
      <div className="event-text">
        <h3>{props.name}</h3>
        <p>{months[date.getMonth()]} {date.getDate()}, {date.getFullYear()}</p>
      </div>
    </Link>
  );
}

class ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentMember: {},
      isEditFormOpen:false,
      isQuestionFormOpen:false,
      eventsToAttend: [],
    }
  }

  //called when profile page initially loaded
  //grabs member name from url and sends it to the backend to fetch the profile data
  componentDidMount() {
    const target = this.props.location.pathname.split("/")[2];
    this._getProfile(target);
  }

  //fetches profile object data based on target from db
  _getProfile = (target) => {
    axios.get("/api/member/profile/", {
      params: {
        firstLast: target,
      }
    }).then((res) => {
      if (res.data) this.setState({currentMember: res.data}, () => this._getEventsToAttend());
    });
  }

  _getEventsToAttend = () => {
    var eventsToAttend = [];
    async.eachSeries(this.state.currentMember.toAttend, (event, callback) => {
      axios.get("/api/event/getEvent/", {
        params: {
          _id: event.eventId,
        }
      }).then((res) => {
        eventsToAttend.push(res.data)
      }).then(() => callback(null));
    }, (err) => {
      if (err) throw err;
      else this.setState({eventsToAttend: eventsToAttend});
    });
  }

  _renderAttend = (props) => {
    return (
      <div style={{marginTop: "2em"}} className="grid-container">
        {this.state.eventsToAttend ? this.state.eventsToAttend.map((item, index) => (
          <AttendItem id={item._id} name={item.name} date={item.date} key={index}/>
        )) : null}
      </div>
    );
  }
  _deleteMember = () => {
    const confirmed = window.confirm("Are you sure you would like to permanently delete this member?");
    if (confirmed) {
      axios.delete("/api/event/deleteMember", {
        data: {
          _id: this.state.currentMember._id,
        }
      }).then(() => window.location.replace("/members"));
    }
  }

  render() {
    const editButton = this.props.currentUser.isAdmin ? 
      <button className="manage-btn" style={{height: "3.5em", marginTop: "1.25em", marginLeft: "5%"}}
        onClick={() => this.setState({isEditFormOpen: !this.state.isEditFormOpen})}>Edit Profile</button> : null;

    const editForm = this.props.currentUser.isAdmin ?
      <div style={this.state.isEditFormOpen ? {} : {display: "none"}}>
        <hr className="page-divider"/>
        <div style={{marginLeft: "5%"}}><ProfileEditForm isFormOpen={this.state.isEditFormOpen} currentMember={this.state.currentMember}/></div>
      </div> : null;

    const questionButton = this.props.currentUser.isAdmin ? 
    <button className="manage-btn" style={{height: "3.5em", marginTop: "1.25em", marginLeft: "5%"}}
      onClick={() => this.setState({isQuestionFormOpen: !this.state.isQuestionFormOpen})}>Edit Answers</button> : null;

    const questionForm = this.props.currentUser.isAdmin ?
    <div style={this.state.isQuestionFormOpen ? {} : {display: "none"}}>
      <hr className="page-divider"/>
      <div style={{marginLeft: "5%"}}><QuestionForm isFormOpen={this.state.isQuestionFormOpen} currentMember={this.state.currentMember}/></div>
    </div> : null;

    const eventsToAttend = this.props.currentUser.isAdmin ? 
      <div>
        <h1 className="page-text">Events To Attend</h1>
        <hr className="page-divider"/>
        {this.state.currentMember.toAttend && this.state.currentMember.toAttend.length !== 0 
          ? this._renderAttend(this.state.currentMember.toAttend) : <b style={{marginLeft: "5%"}}>No events to attend.</b>}
      </div> : null;

    const yourEvents = this.props.currentUser.email === this.state.currentMember.email ?
      <div>
        <h1 className="page-text">Your Events</h1>
        <hr className="page-divider"/>
        {this.state.currentMember.toAttend && this.state.currentMember.toAttend.length !== 0 
          ? this._renderAttend(this.state.currentMember.toAttend) : <b style={{marginLeft: "5%"}}>No events to attend.</b>}
      </div> : eventsToAttend;

    const deleteMember = this.props.currentUser.isAdmin ? 
      <div className="event-btn-container">
        <button className="manage-btn" onClick={this._deleteMember}>
          Delete Member
        </button>
        </div> : null;
    
    return (
      <div className="page-wrapper">
        <div className="page-content">
          <div style={{display: "flex", flexDirection: "row"}}>
            <img className="profile-img" src={this.state.currentMember.image} alt="profile"/>
            <div style={{display: "flex", flexDirection: "column", marginLeft: "5%", width: "600px"}}>
              <h1>{this.state.currentMember.firstName} {this.state.currentMember.lastName}</h1>
              <InfoItem data="Programs: " item={this.state.currentMember.programs}/>
              <InfoItem data="Email: " item={this.state.currentMember.email}/>
              <InfoItem data="Office Hours: " item={this.state.currentMember.officeHours}/>
            </div>
          </div>            
          <div style={{display:"flex", flexDirection: "column",marginRight: "5%"}}>
            {editButton}
          </div>
            {editForm}
          <h1 className="page-text">Questions</h1>
          <hr className="page-divider"/>
          { this.state.currentMember.questions !== undefined ?
          <div>
          <QuestionItem question="What did you study and why?" answer={this.state.currentMember.questions[0]}/>
          <QuestionItem question="Where else have you traveled (2+ weeks)?" answer={this.state.currentMember.questions[1]}/>
          <QuestionItem question="What was one of the biggest challenges you faced while abroad?" answer={this.state.currentMember.questions[2]}/>
          <QuestionItem question="Do you have any advice for students looking to study abroad?" answer={this.state.currentMember.questions[3]}/>
          <QuestionItem question="What was an interesting experience you had while abroad?" answer={this.state.currentMember.questions[4]}/>
          </div> :
          null
          }
          <div style={{display:"flex", flexDirection: "column",marginRight: "5%"}}>
            {questionButton}
          </div>
            {questionForm}
          {yourEvents}
          {deleteMember}
        </div>
      </div>
    );
  }
}

export default ProfilePage;