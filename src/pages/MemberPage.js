import React, { Component } from 'react';
import { Link } from "react-router-dom";
import ProfilePic from "./pfp_placeholder.jpg";

var lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
var testArr = [
  {firstName: "George", lastName: "Washington", quote: lorem},
  {firstName: "Abraham", lastName: "Lincoln", quote: lorem},
  {firstName: "John", lastName: "Adams", quote: lorem},
  {firstName: "Dwight", lastName: "Eisenhower", quote: lorem},
  {firstName: "Herbert", lastName: "Hoover", quote: lorem},
  {firstName: "Randy", lastName: "Jackson", quote: lorem},
  {firstName: "Barack", lastName: "Obama", quote: lorem},
  {firstName: "Jeff", lastName: "Goldblum", quote: lorem},
  {firstName: "George", lastName: "Bush", quote: lorem},
  {firstName: "Bill", lastName: "Clinton", quote: lorem}
];

const MemberItem = (props) => {
  var url = "/profile/" + props.item.firstName + props.item.lastName;
  return (
    <Link to={{
      pathname: url,
      member: testArr[props.index]
    }} style={{color: "black"}}>
    <div className="member-container">
        <div className="member-card">
          <img className="member-img" src={ProfilePic} alt="member profile"/>
          <div className="member-text">
            <h2>{props.item.firstName} {props.item.lastName}</h2>
            <p>{props.item.quote}</p>
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
    /*if (!this.state.interval) {
      let interval = setInterval(this.getMembers, 1000);
      this.setState({ interval: interval });
    }*/
  }

  getMembers = () => {
    fetch("http://localhost:8080/api/getMembers")
      .then(function(res) {
        return res.json();
      })
      .then((res) => {
        this.setState({ members: res.data });
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
          {this._renderItems(testArr, this.state.currentQuery)}
        </div>
      </div>
    );
  }
}

export default MemberPage;