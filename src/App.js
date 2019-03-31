import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import WelcomePage from './pages/WelcomePage.js';
import MemberPage from './pages/MemberPage.js';
import EventPage from './pages/EventPage.js';
import ProfilePage from './pages/ProfilePage.js';
import AboutPage from './pages/AboutPage.js';
import ManageMembersPage from './pages/ManageMembersPage.js';
import ManageExecutivesPage from './pages/ManageExecutivesPage.js';
import AdministratorChangePage from './pages/AdministratorChangePage.js';
import UFLogo from "./UF_white.png";
import './App.css';

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
          <HLink name="About" link="/about"/>
          <HLink name="Manage Members" link="/managemembers"/>
          <HLink name="Manage Executives" link="/manageexecutives"/>
          <HLink name="Administrator Change" link="/administratorchange"/>
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
          <div style={{marginTop: "5em"}}>
            <Route exact path="/" component={WelcomePage}/>
            <Route path="/members" component={MemberPage}/>
            <Route path="/events" component={EventPage}/>
            <Route path="/profile" component={ProfilePage}/>
            <Route path="/about" component={AboutPage}/>
			<Route path="/managemembers" component={ManageMembersPage}/>
            <Route path="/manageexecutives" component={ManageExecutivesPage}/>
            <Route path="/administratorchange" component={AdministratorChangePage}/>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
