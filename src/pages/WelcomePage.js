import React, { Component } from 'react';
import '../App.css';
import WelcomePageFinal from "../images/SAPA logo welcome page.png";

class WelcomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <div className="page-wrapper" style={{marginTop: "-2em"}}>
        <img className="welcome-img" src={WelcomePageFinal} alt="welcome to ufsapa"/>
      </div>
    );
  }
}

export default WelcomePage;