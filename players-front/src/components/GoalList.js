import React, { Component } from "react";
import { Button } from "reactstrap";
import './styles/UserGoals.css';
import { token_to_json } from './helpers/token_helpers.js';
import UserGoal from "./UserGoal.js";

// API
//import axios from "axios";
import axiosWithJWT from "../axiosApi";

class GoalList extends Component {

  state = {
    goals: [],
    total: 0,
  }

  componentDidMount() {
    // token_to_json is a helper function
    let token_json = token_to_json(localStorage.getItem('access_token'));
    console.log(token_json)
    axiosWithJWT.get('/accounts/' + token_json.user_id + '/goals').then(
      response => {
        this.setState({
          goals: response.data,
        });
        console.log(response.data);
      }
    ).catch(err => {
      console.log("Err: " + err);
      window.alert(err);
    })
  }

  format_JSdate(date) {
    const offset = date.getTimezoneOffset()
    date = new Date(date.getTime() + (offset*60*1000))
    return date.toISOString().split('T')[0]
  }

  componentWillUnmount() {
    // TODO: deal with saving the total
  }

  addMore = () => {
    this.props.setPage("edit_goals")
  }

  // passed for use by children components
  totalUpdate = (points_change) => {
    this.setState((state) => ({
      total: state.total + points_change
    }));
  }

  render() {
    return (
      <div>
        <h1 id="total">TOTAL = {this.state.total}</h1>
        {this.state.goals.map((goal, i) => (
          // for each goal:
          <UserGoal key={goal.id} goal={goal} date={this.format_JSdate(new Date())} 
                totalUpdate={this.totalUpdate}/* function for changing point total */ />
        ))}
        
        <button id="add-more-goals" onClick={this.addMore}>Edit Goals... </button>

        <Button id="back-button" color="primary" onClick={() => this.props.setPage("landing")}>Back</Button>
      </div>
    )
  }
}

export default GoalList