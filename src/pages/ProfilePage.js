import React, { Component } from 'react';

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
      currentMember: {}
    }
  }

  componentDidMount() {
    console.log(this.props.location.pathname.split("/")[2]);
    var currMember = this.props.location.member;
    this.setState({currentMember: currMember}, () => {
      try { 
        //console.log(this.state.currentMember.image);
      }
      catch (e) {
        console.log(e);
      }
    });
  }

  render() {
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