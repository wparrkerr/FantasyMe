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
      }
    ).catch(err => {
      console.log("Err: " + err);
      window.alert(err);
    })
  }

  componentWillUnmount() {
    
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
        {/* <Table>
          <thead>
            <tr key="header">
              <th>id</th>
              <th>account</th>
              <th>name</th>
              <th>points_per_complete</th>
            </tr>
          </thead>
          <tbody>
            {this.state.goals.map((goal, i) => (
              <tr key={"goals" + i}>
                <td>{goal.id}</td>
                <td>{goal.account}</td>
                <td>{goal.name}</td>
                <td>{goal.points_per_complete}</td>
              </tr>
            ))}
          </tbody>
        </Table> */}

        <h1 id="total">TOTAL = {this.state.total}</h1>
        {this.state.goals.map((goal, i) => (
          // for each goal:
          <div id="goal-row" key={"goal"+i}>
            <p id="goal-name">{goal.name}</p>
            <input id="goal-input" defaultValue="0" min="0" type="number" name="goal_quantity" onChange = {this.changeQuantity(i)}/>
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