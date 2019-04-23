import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import WelcomePage from './pages/WelcomePage.js';
import MemberPage from './pages/MemberPage.js';
import AlumniPage from './pages/AlumniPage.js';
import EventPage from './pages/EventPage.js';
import ProfilePage from './pages/ProfilePage.js';
import EventInfoPage from './pages/EventInfoPage.js';
import AboutPage from './pages/AboutPage.js';
import LoginWindow from './components/LoginWindow.js';
//import ManagementPage from './pages/ManagementPage.js';
import UFLogo from './images/earth_sapa.gif';
import axios from 'axios';
import './App.css';

/*
######
TODO: HEADER BAR UNDERLINING DOESNT WORK IF YOU GO TO URL DIRECTLY INSTEAD OF CLICKING THE BUTTONS
also broken when refreshing page
######
*/

//checking if a jwt exists, then deleting it if it is expired
if (localStorage.jwt) {
  const token = localStorage.getItem('jwt');
  const now = Date.now() / 1000;
  axios.post("/api/auth/decode", {token: token})
    .then((res) => {
      if (res.data.data.exp < now) {
        localStorage.removeItem('jwt');
      }
    });
}

class HeaderBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: "Home",
      currentUser: {},
      profile: this.props.profile,
	  }
  }

  componentDidMount() {
    this._checkLogInStatus();
  }
  
  //checks if a jwt is present
  //if jwt exists, loads token and sends it to backend for decodeing
  //on successful decode, takes payload and puts it into this.state.currentUser
  _checkLogInStatus = () => {
    if (localStorage.jwt) {
      const token = localStorage.getItem("jwt");
      axios.post("/api/auth/decode", {token: token}).then((res) => {
        if (res.data) {
          this.setState({currentUser: res.data.data});
        }
      });
    }
  }

  //changes which hlink is underlined
  //kinda broken, need to switch based on url instead
  selectHLink = name => {
    this.setState({selected: name});
  }

  render() {
    const headerRight = this.state.currentUser.email ?
      <ProfileCircle image={this.props.profile.image} link={'/profile/' + this.props.profile.firstLast}/> :
      <button className="login-button" onClick={this.props.loginClick}>Log In</button>;
    
    return (
      <div className="header-bar">
        <div style={{display: "flex", flexDirection: "row"}}>
          <Logo onClick={this.selectHLink}/>
          <HLink onClick={this.selectHLink} selected={this.state.selected} name="Home" link="/"/>
          <HLink onClick={this.selectHLink} selected={this.state.selected} name="Members" link="/members"/>
          <HLink onClick={this.selectHLink} selected={this.state.selected} name="Events" link="/events"/>
          <HLink onClick={this.selectHLink} selected={this.state.selected} name="About" link="/about"/>
          {/*<HLink onClick={this.selectHLink} selected={this.state.selected} name="Management" link="/management"/>*/}
        </div>
        {headerRight}
      </div>
    );
  }
}

class ProfileCircle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
	  }
  }

  _logOut = () => {
    localStorage.removeItem('jwt');
    window.location.reload();
  }

  _toggleMenu = () => {
    this.setState({isOpen: !this.state.isOpen});
  }

  render () {
    return (
      <div>
        <div><img onClick={this._toggleMenu} className="circle-img" src={this.props.image}/></div>
        <ProfileMenu onClick={this._toggleMenu} onLogout={this._logOut} isOpen={this.state.isOpen} link={this.props.link}/>
      </div>
    );
  }
}

const ProfileMenu = (props) => {
  return props.isOpen ? (
    <div className="profile-menu">
      <Link onClick={() => {props.onClick(); window.location.assign(props.link)}} className="profile-menu-opt" to={props.link}>
        <span>View Profile</span>
      </Link>
      <span onClick={() => {props.onClick(); props.onLogout()}} className="profile-menu-opt">Log Out</span>
    </div>
  ) : null;
}

//headerbar link (home, members, etc.)
const HLink = (props) => {
  return (
    <Link onClick={() => props.onClick(props.name)} className="hlink" 
      style={props.selected === props.name ? {textDecoration: "underline"} : {}} to={props.link}>
      <p style={{margin: "14px 0 0 0"}}>{props.name}</p>
    </Link>
  );
}

//uf logo on headerbar
const Logo = (props) => {
  return (
    <Link onClick={() => props.onClick("Home")} className="logo-container" to="/">
      <img className="logo-img" src={UFLogo} alt="UF Logo"/>
    </Link>
  );
}

//main react component, entry point for app
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginVisible: false,
      currentUser: {},
      profile: {},
	  }
  }

  componentDidMount() {
    this._checkLogInStatus();
  }
  
  _checkLogInStatus = () => {
    if (localStorage.jwt) {
      const token = localStorage.getItem("jwt");
      axios.post("/api/auth/decode", {token: token}).then((res) => {
        if (res.data) {
          this.setState({currentUser: res.data.data});
          this._getProfile(res.data.data.email);
        }
      });
    }
  }

  _getProfile = (email) => {
    axios.get("/api/member/profile", {
      params: {
        email: email
      }
    }).then((res) => {
      this.setState({profile: res.data});
    });
  }

  render() {
    return (
      <Router>
        <div className="App">
          <LoginWindow isVisible={this.state.loginVisible} onClose={(e) => this.setState({loginVisible: !this.state.loginVisible})}/>
          <HeaderBar profile={this.state.profile} loginClick={(e) => this.setState({loginVisible: !this.state.loginVisible})}/>
          <div style={{marginTop: "1.5em"}}>
            <Route exact path="/" render={(props) => <WelcomePage {...props} currentUser={this.state.currentUser}/>}/>
            <Route path="/members" render={(props) => <MemberPage {...props} currentUser={this.state.currentUser}/>}/>
            <Route path="/alumni" render={(props) => <AlumniPage {...props} currentUser={this.state.currentUser}/>}/>
            <Route path="/events" render={(props) => <EventPage {...props} currentUser={this.state.currentUser}/>}/>
            <Route path="/profile" render={(props) => <ProfilePage {...props} currentUser={this.state.currentUser}/>}/>
            <Route path="/event" render={(props) => <EventInfoPage {...props} currentUser={this.state.currentUser}/>}/>
            <Route path="/about" render={(props) => <AboutPage {...props} currentUser={this.state.currentUser}/>}/>
            {/*<Route path="/management" component={ManagementPage}/>*/}
          </div>
        </div>
      </Router>
    );
  }
}

export default App;