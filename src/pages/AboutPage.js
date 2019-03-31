import React, { Component } from 'react';
import '../App.css';
import FacebookIcon from "./icons/facebook_icon.png";
import InstagramIcon from "./icons/instagram_icon.png";
import EmailIcon from "./icons/email_icon.png";

const ContactLink = (props) => {
  return (
    <div className="contact-link">
      <div>
       <a href={props.link}><img src={props.icon} href={props.link}/></a> 
      </div>
      <div>
      <a href={props.link}>{props.linkTitle}</a>
      </div>
    </div>
  );
}

const ContactBlock = () => {
  return (
    <div className="contact-block">
      <ContactLink icon={EmailIcon} link="mailto:ufsapa+web@gmail.com" linkTitle="ufsapa@gmail.com"/>
      <ContactLink icon={FacebookIcon} link="https://facebook.com/ufsapa" linkTitle="@ufsapa"/>
      <ContactLink icon={InstagramIcon} link="https://www.instagram.com/ufsapa/" linkTitle="@ufsapa"/>
    </div>
  );
}

class AboutPage extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <div className="page-wrapper">
        <div className="page-content">
          <h1 className="page-text">Study Abroad Peer Advisors</h1>
          <hr className="page-divider"/>
          <p className="page-text">
            The Study Abroad Peer Advisor (SAPA) organization is a group of students who have previously studied 
            abroad and are now dedicated to sharing their experiences with other students. We assist students 
            interested in learning more about UF’s study abroad opportunities by matching them with students who 
            have studied on similar programs/locations, or who share similar academic interests. Come to the 
            International Center and talk to us or reach out any time.
          </p>
          <p className="page-text">
            We would love to talk with you! The office hours posted are when our SAPAs can be seen in person in 
            the Study Abroad Services lobby in the International Center. 
          </p>
          <p className="page-text">
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
          <h1 className="page-text">Contact Us</h1>
          <hr className="page-divider"/>
          <ContactBlock/>
        </div>
      </div>
    );
  }
}

export default AboutPage;
