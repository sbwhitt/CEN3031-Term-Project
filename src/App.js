import React, { Component } from 'react';
import './App.css';
import UFLogo from "./UF_white.png";

class HeaderBar extends Component {
  render() {
    return (
      <div className="header-bar">
        <Logo/>
        <div style={{display: "flex", flexDirection: "row", marginRight: "50%"}}>
          <HLink name="Home"/>
          <HLink name="Members"/>
          <HLink name="Events"/>
          <HLink name="Profile"/>
        </div>
        <button className="login-button">Sign Up/Log In</button>
      </div>
    );
  }
}

const HLink = (props) => {
  return (
    <div className="hlink">
      <p style={{margin: "18px 0 0 0"}}>{props.name}</p>
    </div>
  );
}

//<h2 className="logo-title">UF Study Abroad Peer Advisors</h2>
const Logo = () => {
  return (
    <div className="logo-container">
      <img className="logo-img" src={UFLogo}/>
    </div>
  );
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <HeaderBar/>
      </div>
    );
  }
}

export default App;
