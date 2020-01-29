import React, { Component } from "react";
import { Button } from "reactstrap";
import List from "./List.js";

class Login extends Component {

  render() {
    return (
      <div>
          <h2>No authentication set up</h2>
          <Button color="primary" onClick = {() => this.props.setPage("landing")}>BACK</Button>
          <List />
        </div>
    )
  }

}

export default Login