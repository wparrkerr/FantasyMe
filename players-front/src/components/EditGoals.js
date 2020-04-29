import React, { Component } from "react";
import { Button, Table } from "reactstrap";
import './styles/UserGoals.css';
import { token_to_json } from './helpers/token_helpers.js';

// API
//import axios from "axios";
import axiosWithJWT from "../axiosApi";
import BasicModal from "./BasicModal";

class EditGoals extends Component {

  constructor(props) {
    super(props)
    this.state = {
      goals: [],
      new_goal_name: "",
      new_goal_quantity: 0,
      show_modal: false,
      goalToDelete: null,
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
  
  // Sets the key "{id}" equal to "{value}" in state
  handleChange(event) {
    const { id, value } = event.target;
    this.setState({ [id]: value });
  }

  createGoal() {
    const ppc = this.state.new_goal_quantity
    const name = this.state.new_goal_name
    if (String(name) === "") {
      // If no goal name given, do not try to create goal
      return
    }
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
        // reset new_goal fields
        document.getElementById("new_goal_name").value = null
        document.getElementById("new_goal_quantity").value = null
        this.setState({ new_goal_name: "", new_goal_quantity: 0})
        // update goals
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
          let updated_goals = current_goals.filter(goal => goal.id !== goal_id)
          this.setState({ goals: updated_goals})
        }
      }
    ).catch(err => {
      console.log("Err: " + err);
      window.alert(err);
    })
  }

  saveGoalQuantity(goal_id) {
    let inputted_quantity = (parseInt(document.getElementById("quantity-input-"+goal_id).value) || 0)
    const params = {
      "points_per_complete": inputted_quantity
    };
    axiosWithJWT.put(`/goals/${goal_id}`, params).then(
      response => {
        if (response.status === 200) {
          let goals_copy = this.state.goals
          for (let i = 0; i < goals_copy.length; ++i) {
            if (goals_copy[i].id === goal_id) {
              goals_copy[i].points_per_complete = inputted_quantity
            }
          }
          this.setState({ goals: goals_copy})
        }
      }
    ).catch(err => {
      console.log("Err: " + err);
      window.alert(err);
    })
  }

  closeModal(confirmed_status) {
    this.setState({ show_modal: false })
    console.log(confirmed_status)
    if (confirmed_status === "submit") {
      this.deleteGoal(this.state.goalToDelete.id)
    }
  }

  render() {
    return (
      <div>
        {this.state.show_modal 
          ? <BasicModal message={"Are you sure you want to delete goal: " + this.state.goalToDelete.name + "?"}
                        header="Are You Sure?" 
                        close_modal={this.closeModal.bind(this)}/>
          : null}
        <Table>
          <thead>
            <tr key="header">
              <th>Name</th>
              <th>Points per completion </th>
              <th></th>
            </tr>
          </thead>
          {/* EDIT GOALS */}
          <tbody> 
            {this.state.goals.map((goal, i) => (
              <tr key={"goals" + i}>
                <td>{goal.name}</td>
                <td>
                  <input id={"quantity-input-"+goal.id} min={0} type="number" defaultValue={goal.points_per_complete}/>
                  <button onClick={() => {this.saveGoalQuantity(goal.id)}}>save</button>
                </td>
                <td><button onClick={() => {this.setState({show_modal: true, goalToDelete: goal})}}>delete</button></td>
              </tr>
            ))}
            {/* CREATE A NEW GOAL */}
            <tr> 
              <td>
                <input className="new_goal_input" id="new_goal_name" 
                        type="text" onChange = {(e) => {this.handleChange(e)}} placeholder="goal name"/>
              </td>
              <td>
                <input className="new_goal_input" id="new_goal_quantity" 
                        min="0" type="number" onChange = {(e) => {this.handleChange(e)}} placeholder="#pts"/>
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