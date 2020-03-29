import React, { Component } from "react";
import { Button, Table } from "reactstrap";
import './styles/UserGoals.css';
import { token_to_json } from './helpers/token_helpers.js';

// API
//import axios from "axios";
import axiosWithJWT from "../axiosApi";

class EditGoals extends Component {

  state = {
    goals: [],
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

  render() {
    return (
      <div>
        <Table>
          <thead>
            <tr key="header">
              <th>name</th>
              <th>points_per_complete</th>
              <th>delete</th>
            </tr>
          </thead>
          <tbody> {/* EDIT GOALS */}
            {this.state.goals.map((goal, i) => (
              <tr key={"goals" + i}>
                <td>{goal.name}</td>
                <td>
                  <input id="quantity-input" min="0" type="number" onChange = {() => 8} defaultValue={goal.points_per_complete}/>
                  <button>save</button>
                </td>
                <td><button>delete</button></td>
              </tr>
            ))}
            <tr> {/* CREATE A NEW GOAL */}
              <td>
              <input id="new-name-input" type="text" onChange = {() => 8} defaultValue="name"/>
              </td>
              <td>
                <input id="new-quantity-input" min="0" type="number" onChange = {() => 8} defaultValue={0}/>
              </td>
              <td><button>create</button></td>
            </tr>
          </tbody>
        </Table>

        <Button color="primary" onClick={() => this.props.setPage("user_goals")}>Back</Button>
      </div>
    )
  }

}

export default EditGoals