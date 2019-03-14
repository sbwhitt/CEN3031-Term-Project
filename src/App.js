import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css';
import UFLogo from "./UF_white.png";

class HeaderBar extends Component {
  render() {
    return (
      <div className="header-bar">
        <Logo/>
        <div style={{display: "flex", flexDirection: "row", marginRight: "50%"}}>
          <HLink name="Home" link="/"/>
          <HLink name="Members" link="/members"/>
          <HLink name="Events" link="/events"/>
          <HLink name="Profile" link="/profile"/>
        </div>
        <button className="login-button">Sign Up/Log In</button>
      </div>
    );
  }
}

class WelcomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: true,
    }
  }

  render() {
    return (
      <div>
        <h3 style={this.state.isVisible ? {display: "block"} : {display: "none"}}>Welcome</h3>
        <button onClick={() => this.setState({isVisible: !this.state.isVisible})}>click</button>
      </div>
    );
  }
}

const HLink = (props) => {
  return (
    <Link className="hlink" to={props.link}>
      <p style={{margin: "18px 0 0 0"}}>{props.name}</p>
    </Link>
  );
}

const Logo = () => {
  return (
    <Link className="logo-container" to="/">
      <img className="logo-img" src={UFLogo}/>
    </Link>
  );
}

function Members () {
  return <h3>Members</h3>;
}

function Events () {
  return <h3>Events</h3>;
}

function Profile () {
  return <h3>Profile</h3>;
}

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <HeaderBar/>

          <Route exact path="/" component={WelcomePage}/>
          <Route path="/members" component={Members}/>
          <Route path="/events" component={Events}/>
          <Route path="/profile" component={Profile}/>
        </div>
      </Router>
    );
  }
}

export default App;
