import React, { Component } from 'react';
import ProfileEditForm from '../components/ProfileEditForm.js';
import axios from 'axios';

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

class ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentMember: {},
      isFormOpen:false
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
      if (res.data) this.setState({currentMember: res.data});
    });
  }

  render() {
    const editButton = this.props.currentUser.isAdmin ? 
    <button className="manage-btn" style={{height: "3.5em", marginTop: "1.25em", marginRight: "5%"}}
      onClick={() => this.setState({isFormOpen: !this.state.isFormOpen})}>Edit Profile</button> : null;

  const editForm = this.props.currentUser.isAdmin ?
    <div style={this.state.isFormOpen ? {} : {display: "none"}}>
      <hr className="page-divider"/>
      <div style={{marginLeft: "5%"}}><ProfileEditForm isFormOpen={this.state.isFormOpen} currentMember={this.state.currentMember}/></div>
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
        </div>
      </div>
    );
  }
}

export default ProfilePage;