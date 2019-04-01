import React, { Component } from 'react';
import '../App.css';
import WelcomePic from "./WelcomePicture.jpeg";
class WelcomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <div className="page-wrapper">
        <div className="page-content">
        <img className="welcome-img" src={WelcomePic} alt="welcome image"/>
          <h1 className="page-text">UF SAPA</h1>
          <hr className="page-divider"/>
          <p className="page-text">Welcome to the UF SAPA website.</p>
        </div>
      </div>
    );
  }
}

export default WelcomePage;
