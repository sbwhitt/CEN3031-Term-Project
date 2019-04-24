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

  //clearing login form input, called on loginwindow close
  _clearInput = () => {
    this.setState({ emailInput: "", passwordInput: "", badLogin: false });
  }

  //finds a user based on the email entered in the login form
  //notifies user that they have incorrect login info on bad input
  //on correct email, passes the returned user to _validateUser
  _findUser = () => {
    axios.get("/api/auth/user", {
      params: {
        email: this.state.emailInput,
      }
    }).then((res) => {
      if (res.data) this._validateUser(res.data, this._testfunc);
      else this.setState({ badLogin: true });
    });
  }

  //uses bcrypt to compare hashed password from passed in user object with the password entered into the login form
  _validateUser = (user, func) => {
    this.setState({ currentUser: user }, () => {
      func();
    });
  }

  _testfunc = () => {
    console.log(this.state.currentUser);
      bcrypt.compare(this.state.passwordInput, this.state.currentUser.password).then(match => {
        if (match) {
          //password is correct, jwt payload created and sent to _loginUser
          const payload = {
            userId: this.state.currentUser._id,
            email: this.state.currentUser.email,
            isAdmin: this.state.currentUser.isAdmin,
            isExecutive: this.state.currentUser.isExecutive,
          };
          this._loginUser(payload);
        }
        //sets badlogin if the password is incorrect
        else this.setState({ badLogin: true });
      });
  }

  //takes the payload created from a successful login attempt and sends it to backend to create jwt
  _loginUser = (payload) => {
    axios.post("/api/auth/login", payload)
      .then((res) => {
        //on successful token creation, removes current token then adds the new one
        const {token} = res.data;
        if (localStorage.jwt) localStorage.removeItem("jwt");
        localStorage.setItem("jwt", token);
      });
    //reload window now that user is fully logged in
    window.location.reload();
  }

  render() {
    return (
      <div style={this.props.isVisible ? { display: "flex" } : { display: "none" }} className="login-container">
        <div className="login-window">
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button className="login-close" onClick={() => { this.props.onClose(); this._clearInput() }}>x</button>
          </div>
          <h2>Login</h2>
          <p style={this.state.badLogin ? { color: "red" } : { display: "none" }}>Incorrect Email or Password</p>
          <div className="input-container">
            <label style={{ margin: "0" }}>Email</label>
            <div style={{ justifyContent: "center" }}>
              <input className="login-input" type="text" value={this.state.emailInput}
                onChange={(e) => this.setState({ emailInput: e.target.value })} />
            </div>
            <label style={{ margin: "0" }}>Password</label>
            <div style={{ justifyContent: "center" }}>
              <input className="login-input" type="password" value={this.state.passwordInput}
                onChange={(e) => this.setState({ passwordInput: e.target.value })} />
            </div>
            <div style={{ justifyContent: "center" }}>
              <button className="manage-btn" style={{ marginTop: "1em", width: "15%" }}
                onClick={() => this._findUser()}>Login</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginWindow;