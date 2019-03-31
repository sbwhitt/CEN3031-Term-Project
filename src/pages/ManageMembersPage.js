import React, { Component } from 'react';
import ManagementDashboard from './ManagementDashboard';
import Modal from './Modal';
class ManageMembersPage extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <div className="page-wrapper">
        <div className="page-content">
          <h1 className="page-text">ManageMembers</h1>
		  <button onClick = {(e) => this.setState({isOpen: true})} className="event-button"> "create a new event" </button>
		  <Modal isOpen = {this.state.isOpen} onClose={(e) => this.setState({isOpen: false})}/>
          <hr className="page-divider"/>
		  <ManagementDashboard/>
          <p className="page-text">ManageMembers.</p>
        </div>
      </div>
    );
  }
}

export default ManageMembersPage;