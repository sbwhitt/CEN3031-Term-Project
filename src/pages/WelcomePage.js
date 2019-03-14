import React, { Component } from 'react';
import '../App.css';

class WelcomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: true,
    }
  }

  render() {
    return (
      <div className="welcome-wrapper">
        <div className="welcome-content">
          <p className="welcome-text" style={{fontSize: "24px"}}>Study Abroad Peer Advisors</p>
          <hr style={{width: "90%", height: "1px", border: "1px solid #ababab", borderRadius: "4px", backgroundColor: "#ababab"}}/>
          <p className="welcome-text">
            The Study Abroad Peer Advisor (SAPA) organization is a group of students who have previously studied 
            abroad and are now dedicated to sharing their experiences with other students. We assist students 
            interested in learning more about UF’s study abroad opportunities by matching them with students who 
            have studied on similar programs/locations, or who share similar academic interests. Come to the 
            International Center and talk to us or reach out any time.
          </p>
          <p className="welcome-text">
            We would love to talk with you! The office hours posted are when our SAPAs can be seen in person in 
            the Study Abroad Services lobby in the International Center. 
          </p>
          <p className="welcome-text">
            2018-2019 Executive Board: Co-Presidents: Trey LaNasa, Yousef Ghabour
            <br/>
            Secretary: Luke Bickell 
            <br/>
            Treasurer: Erin Connors 
            <br/>
            Vice President of Outreach: Meredith Riccardi
            <br/>
            Vice President of Special Events: Gaby Diaz
          </p>
        </div>
      </div>
    );
  }
}

export default WelcomePage;