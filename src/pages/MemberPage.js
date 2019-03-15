import React, { Component } from 'react';

class MemberPage extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <div className="page-wrapper">
        <div className="page-content">
          <h1 className="page-text">Members</h1>
          <hr className="page-divider"/>
          <p className="page-text">Members.</p>
        </div>
      </div>
    );
  }
}

export default MemberPage;