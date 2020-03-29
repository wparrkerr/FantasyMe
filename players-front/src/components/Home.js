import React, { Component } from "react";
import SignUpForm from "./SignUpForm";
import LoginForm from "./LoginForm";
import Landing from "./Landing.js";
import List from "./List.js";
import UserGoals from "./UserGoals.js"
import EditGoals from "./EditGoals.js"

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
        return (<LoginForm setPage={(pageStr) => this.setPage(pageStr)} update_login_state={this.props.update_login_state}/>)
      case "data_test":
        return (<List setPage={(pageStr) => this.setPage(pageStr)}/>)
      case "user_goals":
        return (<UserGoals setPage={(pageStr) => this.setPage(pageStr)}/>)
      case "edit_goals":
        return (<EditGoals setPage={(pageStr) => this.setPage(pageStr)}/>)
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