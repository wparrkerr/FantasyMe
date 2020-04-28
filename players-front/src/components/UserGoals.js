import React, { Component } from "react";
import { Button } from "reactstrap";
import './styles/UserGoals.css';
import { token_to_json } from './helpers/token_helpers.js';

// API
//import axios from "axios";
import axiosWithJWT from "../axiosApi";

class UserGoals extends Component {

  state = {
    goals: [],
    goal_quantity: [],
    // used to determine (@ unmounting) which quantities have changed and should be updated
    original_goal_quantity: [], 
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
        // initializing goal_quantity as an array of zeros with length equal to goals length
        // has to be here or doesn't work
        this.setState({goal_quantity: Array(this.state.goals.length).fill(0)})
        this.setState({original_goal_quantity: Array(this.state.goals.length).fill(0)})
        this.update_goals_with_completions()
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

  update_goals_with_completions() {
    for (var i = 0; i < this.state.goals.length; ++i){
      this.add_completion_quantity(i, this.state.goals[i].id, this.format_JSdate(new Date()))
    }
  }

  add_completion_quantity = (i, goal_id, date) => {
    axiosWithJWT.get(`/completions/${goal_id}/${date}`).then(
      response => {
        if (response.status === 200) {
          let completion = response.data
          this.state.goal_quantity[i] = completion.quantity
          this.state.original_goal_quantity[i] = completion.quantity
          this.forceUpdate()
          this.update_total()
        }
      }
    ).catch(err => {
      console.log("Err: " + err);
      window.alert(err);
    })
  }

  put_completion = (quantity, goal_id, date) => {
    const params = {
      "quantity": quantity,
      "date": date,
      "goal": goal_id,
    }
    axiosWithJWT.put(`/completions/${goal_id}/${date}`, params).catch(err => {
      console.log("Err: " + err);
      window.alert(err);
    })
  }

  componentWillUnmount() {
    for (let i = 0; i < this.state.goals.length; ++i){
      let quantity = this.state.goal_quantity[i]
      if (quantity !== this.state.original_goal_quantity[i]){
        this.put_completion(quantity, this.state.goals[i].id, this.format_JSdate(new Date()))
      }
    }
  }

  changeQuantity = i => e => {
    var newvalue = 0
    if (e.target.value > 0) { newvalue = e.target.value }
    this.state.goal_quantity[i] = newvalue
    this.update_total()
  };

  update_total() {
    var sum = 0
    this.state.goals.forEach((el, i) => {
      sum += (this.state.goals[i].points_per_complete * this.state.goal_quantity[i])
    })
    this.setState({total: sum})
  }

  addMore = () => {
    this.props.setPage("edit_goals")
  }

  render() {
    return (
      <div>
        <h1 id="total">TOTAL = {this.state.total}</h1>
        {this.state.goals.map((goal, i) => (
          // for each goal:
          <div id="goal-row" key={"goal"+i}>
            <p id="goal-name">{goal.name}</p>
            <input id="goal-input" defaultValue={this.state.goal_quantity[i]} min="0" type="number" 
                  name="goal_quantity" onChange = {this.changeQuantity(i)}/>
            <div id="goal-math">
              <p id={"goal-math" + i}>
                {this.state.goal_quantity[i]} x {this.state.goals[i].points_per_complete} = 
                {this.state.goal_quantity[i] * this.state.goals[i].points_per_complete}
              </p>
            </div>
          </div>
        ))}
        
        <button id="add-more-goals" onClick={this.addMore}>Edit Goals... </button>

        <Button id="back-button" color="primary" onClick={() => this.props.setPage("landing")}>Back</Button>
      </div>
    )
  }

}

export default UserGoals