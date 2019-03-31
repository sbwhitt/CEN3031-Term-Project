import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import WelcomePage from './pages/WelcomePage.js';
import MemberPage from './pages/MemberPage.js';
import EventPage from './pages/EventPage.js';
import ProfilePage from './pages/ProfilePage.js';
import AboutPage from './pages/AboutPage.js';
import UFLogo from "./UF_white.png";
import './App.css';

class HeaderBar extends Component {
  render() {
    return (
      <div className="header-bar">
        <div style={{display: "flex", flexDirection: "row"}}>
          <Logo/>
          <HLink name="Home" link="/"/>
          <HLink name="Members" link="/members"/>
          <HLink name="Events" link="/events"/>
          <HLink name="Profile" link="/profile"/>
          <HLink name="About" link="/about"/>
        </div>
        <button className="login-button">Log In</button>
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
      <img className="logo-img" src={UFLogo} alt="UF Logo"/>
    </Link>
  );
}

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <HeaderBar/>
          <div style={{marginTop: "2em"}}>
            <Route exact path="/" component={WelcomePage}/>
            <Route path="/members" component={MemberPage}/>
            <Route path="/events" component={EventPage}/>
            <Route path="/profile" component={ProfilePage}/>
            <Route path="/about" component={AboutPage}/>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
