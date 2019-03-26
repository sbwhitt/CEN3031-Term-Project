import React, { Component } from 'react';

class ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <div className="page-wrapper">
        <div className="page-content">
          <h1 className="page-text">Profile</h1>
          <hr className="page-divider"/>
          <p className="page-text">Profile.</p>
        </div>
      </div>
    );
  }
}

export default ProfilePage;