import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import WelcomePage from './pages/WelcomePage.js';
import MemberPage from './pages/MemberPage.js';
import EventPage from './pages/EventPage.js';
import ProfilePage from './pages/ProfilePage.js';
import AboutPage from './pages/AboutPage.js';
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
          <div style={{display: "flex", justifyContent: "center"}}><input style={{width: "25%", height: "1em", paddingLeft: "1em"}} type="text"/></div>
        </div>
        <div style={{display: "flex", flexDirection: "column", justifyContent: "flex-start", marginBottom: "1em"}}>
          <p style={{margin: "0"}}>Password</p>
          <div style={{display: "flex", justifyContent: "center"}}><input style={{width: "25%", height: "1em", paddingLeft: "1em"}} type="text"/></div>
        </div>
      </div>
    </div>
  );
}

const HeaderBar = (props) => {
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
      <button className="login-button" onClick={props.loginClick}>Log In</button>
    </div>
  );
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