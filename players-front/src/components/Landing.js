import React, { Component } from "react";
import { Button } from "reactstrap";
import './styles/Landing.css';

class Landing extends Component {

  render() {
    return (
      <div>
        <h2 id = "slogan">Be the best you.</h2>
        <div id = "button-container">
          <Button size="sm" color="primary" onClick = {() => this.props.setPage("login")}>Log In</Button>{' '}
          <Button size="sm" outline color="primary" onClick = {() => this.props.setPage("signup")}>Sign Up</Button>
          <Button size="sm" outline color="primary" onClick = {() => this.props.setPage("data_test")}>Server Data</Button>
        </div>
      </div>
    )
  }

}

export default Landing