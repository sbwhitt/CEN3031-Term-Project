import React, { Component } from 'react';
import { Link } from "react-router-dom";

const AlumniItem = (props) => {
  const url = "/alumni/"
  return (
    <Link to={{
      pathname: url,
    }} style={{color: "black"}}>
    <div className="alumni-container">
        <div className="alumni-card">
          <div className="alumni-text">
            <h2>{props.item.firstName} {props.item.lastName}</h2>
          </div>
        </div>
    </div>
    </Link>
  );
}

const AlumniSearch = (props) => {
  return (
    <div className="search-container">
      <input className="search-bar" onChange={props.onChange} placeholder="Search for Alumni here..."/>
    </div>
  );
}
  
class AlumniPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alumni: [],
      interval: false,
      currentQuery: ""
    }
  }

  //called when member page initially loads
  //grabs list of all members from db
  componentDidMount() {
    this.getAlumni();
  }

  getAlumni = () => {
    fetch("/api/alumni/getAlumni")
      .then(function(res) {
        return res.json();
      })
      .then((res) => {
        this.setState({ alumni: res.data });
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
          (item.firstName + ' ' + item.lastName).toLowerCase().includes(this.state.currentQuery.toLowerCase()))
          .map((item, index) => (
            <AlumniItem item={item} key={index} index={index}/>
          )
        )}
      </div>
    );
  }

  render() {
    return (
      <div className="page-wrapper">
        <div className="page-content">
          <h1 className="page-text">Alumni</h1>
          <hr className="page-divider"/>
          <AlumniSearch onChange={(e) => this._onSearchChange(e)}/>
          {this._renderItems(this.state.alumni, this.state.currentQuery)}
        </div>
      </div>
    );
  }
}

export default AlumniPage;