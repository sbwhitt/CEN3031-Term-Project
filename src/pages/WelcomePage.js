import React, { Component } from 'react';
import { Link } from "react-router-dom";
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
        {/*<Link to="/members" className="member-btn">
          <h1>View Current Advisors</h1>
        </Link>*/}
      </div>
    );
  }
}

export default WelcomePage;