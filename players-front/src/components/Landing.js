import React, { Component } from "react";
import { Button } from "reactstrap";
import './styles/Landing.css';
import { isValid } from "./helpers/token_helpers.js"

class Landing extends Component {

  server_data_clicked() {
    if (isValid(localStorage.getItem('access_token'))){
      this.props.setPage("data_test");
    } else {
      console.log("not authorized. access token is: " + localStorage.getItem('access_token'));
    }  
  }

  login_clicked() {
    if (isValid(localStorage.getItem('access_token'))){
      // skip login and go straight to user goals page
      console.log("your current token is good!");
      this.props.setPage("user_goals"); // redirect to user goals page
    } else {
      console.log("your last token is expired or null!");
      this.props.setPage("login");
    }
  }

  render() {
    return (
      <div>
        <h2 id = "slogan">Be the best you.</h2>
        <div id = "button-container">
          <Button size="sm" color="primary" onClick = {() => this.login_clicked()}>Log In</Button>{' '}
          <Button size="sm" outline color="primary" onClick = {() => this.props.setPage("signup")}>Sign Up</Button>{' '}
          <Button size="sm" outline color="primary" onClick = {() => this.server_data_clicked()}>Server Data</Button>
        </div>
      </div>
    )
  }

}

export default Landing