import React, { Component } from 'react';
import '../App.css';
import WelcomePageFinal from "./welcomepagefinal1.jpg";

class WelcomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <div className="page-wrapper" style={{marginTop: "-2em"}}>
        <img className="welcome-img" src={WelcomePageFinal}/>
      </div>
    );
  }
}

export default WelcomePage;
