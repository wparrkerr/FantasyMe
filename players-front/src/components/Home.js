import React, { Component } from "react";
import SignUpForm from "./SignUpForm";
import Landing from "./Landing.js";

class Home extends Component {

  state = {
    page: "landing"
  }

  setPage(pageStr){
    this.setState({ page : pageStr });
  }

  renderDecision = () => {
    switch(this.state.page){
      case "landing":
        return (<Landing setPage={(pageStr) => this.setPage(pageStr)} />)
      case "signup":
        return (<SignUpForm setPage={(pageStr) => this.setPage(pageStr)}/>)
      case "login":
        return (
          <div>
            <h2>Under construction, sir.</h2>
            <button onClick = {() => this.setPage("landing")}>BACK</button>
          </div>
        )
      default:
        return (<h2>Whoops! Invalid Page Name!</h2>)
    }
  };

  render() {
    return (
      <div>
        {this.renderDecision()}
      </div>
    )
  }
  
}

export default Home