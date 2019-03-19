import React, { Component } from 'react';

class ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentMember: {}
    }
  }

  componentDidMount() {
    var currMember = this.props.location.member;
    //console.log(currMember.firstName);
    this.setState({currentMember: currMember}, () => {
      try { 
        console.log(this.state.currentMember.firstName)
      }
      catch (e) {
        console.log(e);
      }
    });
  }
//{this.state.currentMember.firstName} {this.state.currentMember.lastName}
  render() {
    try {
      var first = this.state.currentMember.firstName;
      var last = this.state.currentMember.lastName;
    }
    catch (e) {
      console.log(e);
    }
    return (
      <div className="page-wrapper">
        <div className="page-content">
          <h1 className="page-text">{first} {last} Profile</h1>
          <hr className="page-divider"/>
          <p className="page-text">Profile.</p>
        </div>
      </div>
    );
  }
}

export default ProfilePage;