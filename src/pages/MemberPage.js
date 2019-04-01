import React, { Component } from 'react';
import { Link } from "react-router-dom";
import ProfilePic from "./pfp_placeholder.jpg";

const MemberItem = (props) => {
  var url = "/profile/" + props.item.firstName + props.item.lastName;
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
            <p><b>Majors: </b>{props.item.majors}</p>
            <p style={{zIndex: "2"}}><b>Email: </b><a href={"mailto:" + props.item.email}>{props.item.email}</a></p>
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

  componentDidMount() {
    this.getMembers();
  }

  getMembers = () => {
    fetch("http://localhost:8080/api/member/getMembers")
      .then(function(res) {
        return res.json();
      })
      .then((res) => {
        this.setState({ members: res.data }, () => console.log(this.state.members));
      });
  };

  _onSearchChange = (e) => {
    this.setState({currentQuery: e.target.value}, () => console.log(this.state.currentQuery));
  }

  _renderItems = (arr, filter) => {
    return (
      <div>
        {arr.filter((item) => this.state.currentQuery === "" || 
          (item.firstName + ' ' + item.lastName).toLowerCase().includes(this.state.currentQuery.toLowerCase()))
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