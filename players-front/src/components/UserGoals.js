import React, { Component } from "react";
import { Button, Table } from "reactstrap";
import './styles/Header.css';
import { token_to_json } from './helpers/token_helpers.js';

// API
//import axios from "axios";
import axiosWithJWT from "../axiosApi";

class UserGoals extends Component {

  state = {
    goals: []
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
              <th>id</th>
              <th>account</th>
              <th>name</th>
              <th>points_per_complete</th>
            </tr>
          </thead>
          <tbody>
<<<<<<< HEAD
            {this.state.goals.map((goal, i) => (
              <tr key={"goals" + i}>
=======
            {this.state.goals.map(goal => (
              <tr key="goals">
>>>>>>> 0b31c0a0a9e71b8e1801c119710232c29f385620
                <td>{goal.id}</td>
                <td>{goal.account}</td>
                <td>{goal.name}</td>
                <td>{goal.points_per_complete}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Button color="primary" onClick={() => this.props.setPage("landing")}>Back</Button>
      </div>
    )
  }

}

export default UserGoals