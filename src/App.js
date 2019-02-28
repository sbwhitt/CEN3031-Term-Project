import React, { Component } from 'react';
import './App.css';

const Logo = (props) => {
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
        <div className="header-bar">
          <Logo/>
        </div>
      </div>
    );
  }
}

export default App;
