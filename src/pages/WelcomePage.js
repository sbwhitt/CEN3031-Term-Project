import React, { Component } from 'react';
import '../App.css';

class WelcomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <div className="page-wrapper">
        <div className="page-content">
          <h1 className="page-text">UF SAPA</h1>
          <p className="page-text">Welcome to the UF SAPA website.</p>
        </div>
      </div>
    );
  }
}

export default WelcomePage;