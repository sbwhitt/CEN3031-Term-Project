import React, { Component } from 'react';
import { Link } from "react-router-dom";

const MemberItem = (props) => {
  const url = "/profile/" + props.item.firstLast;
  const majors = props.item.majors.join(", ");
  const minors = props.item.minors.join(", ");
  return (
    <Link to={{
      pathname: url,
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
      currentQuery: ""
    }
  }

  //called when member page initially loads
  //grabs list of all members from db
  componentDidMount() {
    this.getMembers();
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

  //called when searchbar input changes
  _onSearchChange = (e) => {
    this.setState({currentQuery: e.target.value});
  }

  //first filters the member list based on the search query, then maps them to a list of MemberItem components
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
    return (
      <div className="page-wrapper">
        <div className="page-content">
          <h1 className="page-text">Members</h1>
          <hr className="page-divider"/>
          <MemberSearch onChange={(e) => this._onSearchChange(e)}/>
          {this._renderItems(this.state.members, this.state.currentQuery)}
        </div>
      </div>
    );
  }
}

export default MemberPage;