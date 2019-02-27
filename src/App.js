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

const Logo = () => {
  return (
    <div className="logo-container">
      <div className="logo-img"/>
      <h2 className="logo-title">UF Study Abroad Peer Advisors</h2>
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
