import React, { Component } from 'react';
import EventForm from '../components/CreateEventForm.js';

class ManageEvents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFormOpen: false
    }
  }

  render() {
    return (
      <div style={this.props.currentForm === this.props.name ? {} : {display: "none"}}>
        <h1 className="page-text">{this.props.name}</h1>
        <hr className="page-divider" />
        <div style={{ marginLeft: "5%", marginTop: "1em" }}>
          <button style={this.state.isFormOpen ? {display: "none"} : {}}
            onClick={(e) => this.setState({ isFormOpen: true })}
            className="manage-btn">
            Create a New Event</button>
          <button style={this.state.isFormOpen ? {} : {display: "none"}}
            onClick={(e) => this.setState({ isFormOpen: false })}
            className="manage-btn">
            Close</button>
          <EventForm isFormOpen={this.state.isFormOpen}/>
        </div>
      </div>
    );
  }
}

class ManageMembers extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <div style={this.props.currentForm === this.props.name ? {} : {display: "none"}}>
        <h1 className="page-text">{this.props.name}</h1>
        <hr className="page-divider" />
        <p className="page-text">Member Management</p>
      </div>
    );
  }
}

class ManageExecutives extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isExecutivesOpen: false
    }
  }

  makeTable(arrayNames) {
    var table = [];
    for (let i = 0; i < arrayNames.length; i++) {
      table.push(<option> {arrayNames[i]} </option>)
    }
    return table;
  }

  render() {
    return (
      <div style={this.props.currentForm === this.props.name ? {} : {display: "none"}}>
        <h1 className="page-text">{this.props.name}</h1>
        <hr className="page-divider" />
        <h2 className="page-text">Current Executives</h2>
        <div style={{ marginLeft: "5%" }}>
          <select name="Executives" >
            <option value="" selected disabled hidden>Executives</option>
            {this.makeTable(this.props.executives)}
          </select>
          <br />
          <input type="submit" value="Demote Executive" />
        </div>
        <h2 className="page-text">Current Members</h2>
        <div style={{ marginLeft: "5%" }}>
          <select name="Members">
            <option value="" selected disabled hidden>Members</option>
            {this.makeTable(this.props.members)}
          </select>
          <br />
          <input type="submit" value="Promote to Executive" />
        </div>
      </div>
    );
  }
}

class ManageAdministration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAdministrationOpen: false
    }
  }
  makeTable(arrayNames) {
    var table = [];
    for (let i = 0; i < arrayNames.length; i++) {
      table.push(<option> {arrayNames[i]} </option>)
    }
    return table;
  }
  render() {
    return (
      <div style={this.props.currentForm === this.props.name ? {} : {display: "none"}}>
        <h1 className="page-text">{this.props.name}</h1>
        <hr className="page-divider" />
        <h2 className="page-text">Current Executives</h2>
        <div style={{ marginLeft: "5%" }}>
          <select name="Executives" >
            <option value="" selected disabled hidden>Executives</option>
            {this.makeTable(this.props.executives)}
          </select>
          <br />
          <input type="submit" value="Promote Executive" />
          <button> Demote Account to Executive Level</button>
        </div>
      </div>
    );
  }
}

var names = ["one", "two", "three"];
class ManagementPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      currentForm: ""
    }
  }

  _openForm(form) {
    if (form === this.state.currentForm) {
      this.setState({isOpen: false, currentForm: ""});
    }
    else this.setState({isOpen: true, currentForm: form});
  }

  render() {
    return (
      <div className="page-wrapper">
        <div className="page-content">
          <h1 className="page-text">Management</h1>
          <hr className="page-divider" />
          <div className="button-container">
            <button className="manage-btn" onClick={(e) => this._openForm("Events")}> Manage Events </button>
            <button className="manage-btn" onClick={(e) => this._openForm("Members")}> Manage Members </button>
            <button className="manage-btn" onClick={(e) => this._openForm("Executives")}> Manage Executives </button>
            <button className="manage-btn" onClick={(e) => this._openForm("Administration")}> Manage Administration </button>
          </div>
          <div style={this.state.isOpen ? {} : {display: "none"}} className="form-container">
            <ManageEvents name="Events" currentForm={this.state.currentForm}/>
            <ManageMembers name="Members" currentForm={this.state.currentForm}/>
            <ManageExecutives name="Executives" currentForm={this.state.currentForm} executives={names} members={names}/>
            <ManageAdministration name="Administration" currentForm={this.state.currentForm} executives={names}/>
          </div>
        </div>
      </div>
    );
  }
}

export default ManagementPage;