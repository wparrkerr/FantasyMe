import React, { Component } from "react";
import './styles/UserGoals.css';
// import { token_to_json } from './helpers/token_helpers.js';

// API
//import axios from "axios";
import axiosWithJWT from "../axiosApi";

class UserGoal extends Component {

  state = {
    goal_quantity: 0,
    // used to determine (@ unmounting) whether quantity has changed and should be updated
    original_goal_quantity: 0, 
  }

  componentDidMount() {
    this.add_completion_quantity(this.props.goal.id, this.props.date)
  }

  add_completion_quantity = (goal_id, date) => {
    axiosWithJWT.get(`/completions/${goal_id}/${date}`).then(
      response => {
        if (response.status === 200) {
          const quantity = response.data.quantity
          this.setState({
            goal_quantity: quantity,
            original_goal_quantity: quantity,
          })
          this.props.totalUpdate(quantity*this.props.goal.points_per_complete)
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
    axiosWithJWT.put(`/completions/${goal_id}/${date}`, params).catch(
      err => {
        console.log("Err: " + err);
        window.alert(err);
      }
    )
  }

  componentWillUnmount() {
    const quantity = this.state.goal_quantity
    if (quantity !== this.state.original_goal_quantity){
      this.put_completion(quantity, this.props.goal.id, this.props.date)
    }
  }

  onChange = e => {
    let value = e.target.value
    if (value >= 0) {
      let point_change = (value - this.state.goal_quantity)*this.props.goal.points_per_complete
      this.props.totalUpdate(point_change)
      this.setState({ goal_quantity: value })
      
    }
  };

  render() {
    return (
      <div id="goal-row">
        <p id="goal-name">{this.props.goal.name}</p>
        <input id="goal-input" value={this.state.goal_quantity} min="0" type="number" 
              name="goal_quantity" onChange = {this.onChange}/>
        <div id="goal-math">
          <p id="goal-math-info">
            {this.state.goal_quantity} x {this.props.goal.points_per_complete} = 
            {this.state.goal_quantity * this.props.goal.points_per_complete}
          </p>
        </div>
      </div>
    )
  }
}

export default UserGoal