import React, { Component } from 'react';
import { Link } from "react-router-dom";
import NewMemberForm from '../components/NewMemberForm.js';
import axios from 'axios';

const MemberItem = (props) => {
  const url = "/profile/" + props.item.firstLast;
  const majors = props.item.majors.join(", ");
  const minors = props.item.minors.join(", ");
  return (
    <Link to={{
      pathname: url,
      member: props.item
    }} style={{color: "black"}}>
    <div className="member-container">
        <div className="member-card">
          <img className="member-img" src={props.item.image} alt="member profile"/>
          <div className="member-text">
            <h2>{props.item.firstName} {props.item.lastName}</h2>
            <p><b>Programs: </b>{props.item.programs}</p>
            <p><b>Major(s): </b>{majors}</p>
            { minors !== '' ? <p><b>Minor(s): </b>{minors}</p> : null}
            <p style={{zIndex: "2"}}><b>Email: </b>{props.item.email}</p>
          </div>
        </div>
    </div>
    </Link>
  );
}
// change state variables pass in state 
const MemberSearch = (props) => {
  return (
    <div className="search-container">
      <input className="search-bar" onChange={props.onChange} placeholder="Search for members here..."/>
    </div>
  );
}
  
class MemberPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      members: [],
      interval: false,
      currentUser: {},
      currentQuery: "",
      isFormOpen: false,
    }
  }

  componentDidMount() {
    this.getMembers();
    this._checkLogInStatus();
  }
  _checkLogInStatus = () => {
    if (localStorage.jwt) {
      const token = localStorage.getItem("jwt");
      axios.post("/api/auth/decode", {token: token}).then((res) => {
        if (res.data) this.setState({currentUser: res.data.data});
      });
    }
  }
  getMembers = () => {
    fetch("/api/member/getMembers")
      .then(function(res) {
        return res.json();
      })
      .then((res) => {
        this.setState({ members: res.data });
      });
  };

  _onSearchChange = (e) => {
    this.setState({currentQuery: e.target.value});
  }



  _renderItems = (arr, filter) => {
    return (
      <div>
        {arr.filter((item) => this.state.currentQuery === "" || 
          (item.firstName + ' ' + item.lastName).toLowerCase().includes(this.state.currentQuery.toLowerCase()) ||
           (item.majors + '').toLowerCase().includes(this.state.currentQuery.toLowerCase()) ||
           (item.email + '').toLowerCase().includes(this.state.currentQuery.toLowerCase()) || 
           (item.minors + '').toLowerCase().includes(this.state.currentQuery.toLowerCase()) || 
           (item.programs + '').toLowerCase().includes(this.state.currentQuery.toLowerCase()))
          .map((item, index) => (
            <MemberItem item={item} key={index} index={index}/>
          )
        )}
      </div>
    );
  }

  render() {
    const manageButtons = this.state.currentUser.isAdmin ? 
      <div style={{display: "flex", flexDirection: "column", marginRight: "5%"}}>
        <button className="manage-btn" style={{height: "3em", marginTop: "1.25em"}}
          onClick={() => this.setState({isFormOpen: !this.state.isFormOpen})}>Create New Member</button>
        <button className="manage-btn" style={{height: "2.5em", marginTop: "0.5em"}}
          onClick={() => window.location.replace("/alumni")}>View Alumni</button>
      </div> : null;

    const createForm = this.state.currentUser.isAdmin ?
      <div style={this.state.isFormOpen ? {} : {display: "none"}}>
        <hr className="page-divider"/>
        <div style={{marginLeft: "5%"}}>
          <NewMemberForm isFormOpen={this.state.isFormOpen}/>
        </div>
      </div> : null;

    return (
      <div className="page-wrapper">
        <div className="page-content">
        <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
            <h1 className="page-text">Members</h1>
            {manageButtons}
          </div>
          {createForm}
          <hr className="page-divider"/>
          <MemberSearch onChange={(e) => this._onSearchChange(e)}/>
          {this._renderItems(this.state.members, this.state.currentQuery)}
        </div>
      </div>
    );
  }
}

export default MemberPage;