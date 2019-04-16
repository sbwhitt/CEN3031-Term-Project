import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import WelcomePage from './pages/WelcomePage.js';
import MemberPage from './pages/MemberPage.js';
import EventPage from './pages/EventPage.js';
import ProfilePage from './pages/ProfilePage.js';
import AboutPage from './pages/AboutPage.js';
import ManagementPage from './pages/ManagementPage.js';
import UFLogo from "./UF_white.png";
import './App.css';

const LoginWindow = (props) => {
  return (
    <div style={props.isVisible ? {display: "flex"} : {display: "none"}} className="login-container">
      <div className="login-window">
        <div style={{display: "flex", justifyContent: "flex-end"}}>
          <button onClick={props.onClose} style={{background: "#00000000", border: "none", fontSize: "28px"}}>x</button>
        </div>
        <h2>Login</h2>
        <div style={{display: "flex", flexDirection: "column", justifyContent: "flex-start", marginBottom: "1em"}}>
          <p style={{margin: "0"}}>Email</p>
          <div style={{display: "flex", justifyContent: "center"}}>
            <input style={{width: "25%", height: "1em"}} type="text"/>
          </div>
        </div>
        <div style={{display: "flex", flexDirection: "column", justifyContent: "flex-start", marginBottom: "1em"}}>
          <p style={{margin: "0"}}>Password</p>
          <div style={{display: "flex", justifyContent: "center"}}>
            <input style={{width: "25%", height: "1em"}} type="password"/>
          </div>
        </div>
      </div>
    </div>
  );
}

/*
######
TODO: HEADER BAR UNDERLINING DOESNT WORK IF YOU GO TO URL DIRECTLY INSTEAD OF CLICKING THE BUTTONS
also broken when refreshing page
######
*/

class HeaderBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: "Home",
	  }
  }

  selectHLink = name => {
    this.setState({selected: name});
  }

  render() {
    return (
      <div className="header-bar">
        <div style={{display: "flex", flexDirection: "row"}}>
          <Logo onClick={this.selectHLink}/>
          <HLink onClick={this.selectHLink} selected={this.state.selected} name="Home" link="/"/>
          <HLink onClick={this.selectHLink} selected={this.state.selected} name="Members" link="/members"/>
          <HLink onClick={this.selectHLink} selected={this.state.selected} name="Events" link="/events"/>
          <HLink onClick={this.selectHLink} selected={this.state.selected} name="About" link="/about"/>
          <HLink onClick={this.selectHLink} selected={this.state.selected} name="Management" link="/management"/>
        </div>
        <button className="login-button" onClick={this.props.loginClick}>Log In</button>
      </div>
    );
  }
}

const HLink = (props) => {
  return (
    <Link onClick={() => props.onClick(props.name)} className="hlink" style={props.selected === props.name ? {textDecoration: "underline"} : {}} to={props.link}>
      <p style={{margin: "14px 0 0 0"}}>{props.name}</p>
    </Link>
  );
}

const Logo = (props) => {
  return (
    <Link onClick={() => props.onClick("Home")} className="logo-container" to="/">
      <img className="logo-img" src={UFLogo} alt="UF Logo"/>
    </Link>
  );
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
		  loginVisible: false
	  }
  }

  render() {
    return (
      <Router>
        <div className="App">
          <LoginWindow isVisible={this.state.loginVisible} onClose={(e) => this.setState({loginVisible: !this.state.loginVisible})}/>
          <HeaderBar loginClick={(e) => this.setState({loginVisible: !this.state.loginVisible})}/>
          <div style={{marginTop: "1.5em"}}>
            <Route exact path="/" component={WelcomePage}/>
            <Route path="/members" component={MemberPage}/>
            <Route path="/events" component={EventPage}/>
            <Route path="/profile" component={ProfilePage}/>
            <Route path="/about" component={AboutPage}/>
            <Route path="/management" component={ManagementPage}/>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;