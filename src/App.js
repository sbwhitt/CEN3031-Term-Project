import React, { Component } from 'react';
import './App.css';

class HeaderBar extends Component {
  render() {
    return (
      <div className="header-bar">
        <Logo/>
        <button className="login-button">Sign Up/Log In</button>
      </div>
    );
  }
}

class SideBar extends Component {
  render() {
    return (
      <div className="sidebar-container">
        <ul>
          <li>Home</li>
          <li>Members</li>
          <li>Profile</li>
          <li>About</li>
        </ul>
      </div>
    );
  }
}

const Logo = () => {
  return (
    <div className="logo-container">
      <div className="logo-img"><h2 style={{marginTop: "16px", color: "white", fontSize: "36px"}}>UF</h2></div>
      <h2 className="logo-title">UF Study Abroad Peer Advisors</h2>
    </div>
  );
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <HeaderBar/>
        <SideBar/>
      </div>
    );
  }
}

export default App;
