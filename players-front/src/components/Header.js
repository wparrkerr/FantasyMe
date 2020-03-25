import React, { Component } from "react";
import { Button } from "reactstrap";
import './styles/Header.css';
import { isValid } from './helpers/token_helpers.js'

class Header extends Component {

  componentDidMount() {
    this.update_logged_status();
  }

  update_logged_status = () => {
    if (isValid(localStorage.getItem('access_token'))){ 
      //isValid is a helper function (token_helpers.js)
      document.getElementById("logged-status").style.display = "block";
    } else {
      document.getElementById("logged-status").style.display = "none";
    }
  }

  logout_fun = e => {
    e.preventDefault()
    console.log("running logout_fun")
    localStorage.setItem('access_token', "");
    this.update_logged_status()
    this.props.return_to_landing()
  }

  render() {
    return (
      <div id = "outside">
        <div id = "text-div">
          <h1 id="header-text"><strong>Fantasy Me</strong></h1>
        </div>
        <Button size="sm" id="logged-status" color="primary" onClick={this.logout_fun}>
          Log Out
        </Button>
        {/*localStorage.getItem('access_token') DEBUGGING OUTPUT */}
      </div>
    )
  }
  

}

export default Header