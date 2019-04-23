import React, { Component } from 'react';

const AlumniItem = (props) => {
  return (
    <div>
      <div className="member-container">
        <div className="member-card">
          <img className="member-img" src={props.item.image} alt="member profile" />
          <div className="member-text">
            <h2>{props.item.firstName} {props.item.lastName}</h2>
            <p style={{ zIndex: "2" }}><b>Email: </b>{props.item.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// change state variables pass in state 
const AlumniSearch = (props) => {
  return (
    <div className="search-container">
      <input className="search-bar" onChange={props.onChange} placeholder="Search for alumni here..." />
    </div>
  );
}

class AlumniPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alumni: [],
      interval: false,
      currentQuery: "",
      isFormOpen: false,
    }
  }

  componentDidMount() {
    this.getAlumni();
  }

  getAlumni = () => {
    fetch("/api/alumni/getAlumni")
      .then(function (res) {
        return res.json();
      })
      .then((res) => {
        this.setState({ alumni: res.data });
      });
  };

  _onSearchChange = (e) => {
    this.setState({ currentQuery: e.target.value });
  }

  _renderItems = (arr, filter) => {
    return (
      <div>
        {arr.filter((item) => this.state.currentQuery === "" ||
          (item.firstName + ' ' + item.lastName).toLowerCase().includes(this.state.currentQuery.toLowerCase()) ||
          (item.email + '').toLowerCase().includes(this.state.currentQuery.toLowerCase()))
          .map((item, index) => (
            <AlumniItem item={item} key={index} index={index} />
          )
          )}
      </div>
    );
  }

  render() {
    return (
      <div className="page-wrapper">
        <div className="page-content">
          <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
            <h1 className="page-text">Alumni</h1>
          </div>
          <hr className="page-divider" />
          <AlumniSearch onChange={(e) => this._onSearchChange(e)} />
          {this._renderItems(this.state.alumni, this.state.currentQuery)}
        </div>
      </div>
    );
  }
}

export default AlumniPage;