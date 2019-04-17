import React, { Component } from 'react';
import axios from 'axios';
import bcrypt from 'bcryptjs';

class LoginWindow extends Component {
  constructor(props) {
      super(props);
      this.state = {
      emailInput: "",
      passwordInput: "",
      badLogin: false,
      currentUser: {},
      }
  }

  _clearInput = () => {
      this.setState({emailInput: "", passwordInput: "", badLogin: false});
  }

  _findUser = () => {
      axios.get("/api/auth/user", {
      params: {
          email: this.state.emailInput,
      }
      }).then((res) => {
      if (res.data !== null) {
          this.setState({currentUser: res.data}, () => {
          bcrypt.compare(this.state.passwordInput, this.state.currentUser.password).then(match => {
              if (match) {
              console.log("you a real one");
              this._clearInput();
              }
              else this.setState({badLogin: true});
          });
          });
      }
      else this.setState({badLogin: true});
      });
  }

  render() {
      return (
      <div style={this.props.isVisible ? {display: "flex"} : {display: "none"}} className="login-container">
          <div className="login-window">
          <div style={{display: "flex", justifyContent: "flex-end"}}>
              <button className="login-close" onClick={() => {this.props.onClose(); this._clearInput()}}>x</button>
          </div>
          <h2>Login</h2>
          <p style={this.state.badLogin ? {color: "red"} : {display: "none"}}>Incorrect Email or Password</p>
          <div className="input-container">
              <label style={{margin: "0"}}>Email</label>
              <div style={{justifyContent: "center"}}>
              <input className="login-input" type="text" value={this.state.emailInput}
                  onChange={(e) => this.setState({emailInput: e.target.value})}/>
              </div>
              <label style={{margin: "0"}}>Password</label>
              <div style={{justifyContent: "center"}}>
              <input className="login-input" type="password" value={this.state.passwordInput}
                  onChange={(e) => this.setState({passwordInput: e.target.value})}/>
              </div>
              <div style={{justifyContent: "center"}}>
              <button className="manage-btn" style={{marginTop: "1em", width: "15%"}}
                  onClick={() => this._findUser()}>Login</button>
              </div>
          </div>
          </div>
      </div>
      );
  }
}

export default LoginWindow;