import React, { Component } from "react";
import { Button, Table } from "reactstrap";
import './styles/UserGoals.css';
import { token_to_json } from './helpers/token_helpers.js';

// API
//import axios from "axios";
import axiosWithJWT from "../axiosApi";

class EditGoals extends Component {

  constructor(props) {
    super(props)
    this.state = {
      goals: [],
      new_goal_name: "",
      new_goal_quantity: 0
    }
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
      }
    ).catch(err => {
      console.log("Err: " + err);
      window.alert(err);
    })
  }
0
  // Sets the key "{id}" equal to "{value}" in state
  handleChange(event) {
    const { id, value } = event.target;
    this.setState({ [id]: value });
  }

  createGoal() {
    const ppc = this.state.new_goal_quantity
    const name = this.state.new_goal_name
    // Submit goal to server
    let token_json = token_to_json(localStorage.getItem('access_token'));
    const user_id = token_json.user_id;
    const params = {
      "account": user_id,
      "name": name,
      "points_per_complete": ppc
    };
    axiosWithJWT.post('/goals/create', params).then(
      response => {
        let current_goals = this.state.goals
        let new_goal = response.data
        current_goals.push(new_goal)
        this.setState({ goals: current_goals})
      }
    ).catch(err => {
      console.log("Err: " + err);
      window.alert(err);
    })
  }

  deleteGoal(goal_id) {
    axiosWithJWT.delete(`/goals/${goal_id}`).then(
      response => {
        if (response.status === 200) {
          let current_goals = this.state.goals
          let updated_goals = current_goals.filter(goal => goal.id != goal_id)
          this.setState({ goals: updated_goals})
        }
      }
    ).catch(err => {
      console.log("Err: " + err);
      window.alert(err);
    })
  }
/*
  saveGoalQuantity(goal_id) {
    params = {
      "points_per_complete": 0 // make this accurate
    };
    axiosWithJWT.put(`/goals/${goal_id}`).then(
      response => {
        if (response.status === 200) {
          let current_goals = this.state.goals
          let updated_goals = current_goals.filter(goal => goal.id != goal_id)
          this.setState({ goals: updated_goals})
        }
      }
    ).catch(err => {
      console.log("Err: " + err);
      window.alert(err);
    })
  }
*/
  render() {
    return (
      <div>
        <Table>
          <thead>
            <tr key="header">
              <th>name</th>
              <th>Points per completion </th>
              <th></th>
            </tr>
          </thead>
          <tbody> {/* EDIT GOALS */}
            {this.state.goals.map((goal, i) => (
              <tr key={"goals" + i}>
                <td>{goal.name}</td>
                <td>
                  <input id="quantity-input" min="0" type="number" onChange = {() => 8} defaultValue={goal.points_per_complete}/>
                  <button onClick={() => {this.saveGoalQuantity(goal.id)}}>save</button>
                </td>
                <td><button onClick={() => {this.deleteGoal(goal.id)}}>delete</button></td>
              </tr>
            ))}
            <tr> {/* CREATE A NEW GOAL */}
              <td>
              <input id="new_goal_name" type="text" onChange = {(e) => {this.handleChange(e)}} defaultValue="name"/>
              </td>
              <td>
                <input id="new_goal_quantity" min="0" type="number" onChange = {(e) => {this.handleChange(e)}} defaultValue={0}/>
              </td>
              <td><button onClick={() => {this.createGoal()}}>create</button></td>
            </tr>
          </tbody>
        </Table>

        <Button color="primary" onClick={() => this.props.setPage("user_goals")}>Back</Button>
      </div>
    )
  }

}

export default EditGoals