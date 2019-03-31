import React, { Component } from 'react';
import ManagementDashboard from './ManagementDashboard';
class AdministratorChangePage extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <div className="page-wrapper">
        <div className="page-content">
          <h1 className="page-text">administrator change</h1>
          <hr className="page-divider"/>
		  <ManagementDashboard/>
          <p className="page-text">administrator change.</p>
        </div>
      </div>
    );
  }
}

export default AdministratorChangePage;