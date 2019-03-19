import React, { Component } from 'react';
import { Link } from "react-router-dom";
import ProfilePic from "./pfp_placeholder.jpg";

var lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
var testArr = [
  {firstName: "George", lastName: "Washington", quote: lorem, id: 0},
  {firstName: "Abraham", lastName: "Lincoln", quote: lorem, id: 1},
  {firstName: "John", lastName: "Adams", quote: lorem, id: 2},
  {firstName: "Dwight", lastName: "Eisenhower", quote: lorem, id: 3},
  {firstName: "Herbert", lastName: "Hoover", quote: lorem, id: 4},
  {firstName: "Randy", lastName: "Jackson", quote: lorem, id: 5},
  {firstName: "Barack", lastName: "Obama", quote: lorem, id: 6},
  {firstName: "Jeff", lastName: "Goldblum", quote: lorem, id: 7},
  {firstName: "George", lastName: "Bush", quote: lorem, id: 8},
  {firstName: "Bill", lastName: "Clinton", quote: lorem, id: 9}
];

const MemberItem = (props) => {
  var url = "/profile/" + props.item.firstName + props.item.lastName;
  return (
    <Link to={{
      pathname: url,
      member: testArr[props.item.id]
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

class MemberPage extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  _renderItems = (props) => {
    return (
      <div>
        {props.map((item, index) => (
          <MemberItem item={item} index={index}/>
        ))}
      </div>
    );
  }

  render() {
    return (
      <div className="page-wrapper">
        <div className="page-content">
          <h1 className="page-text">Members</h1>
          <hr className="page-divider"/>
          {this._renderItems(testArr)}
        </div>
      </div>
    );
  }
}

export default MemberPage;