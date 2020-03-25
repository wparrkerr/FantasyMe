import React, { Component } from "react";
import { Button, Table } from "reactstrap";
import './styles/Header.css';

// API
//import axios from "axios";
import axiosWithJWT from "../axiosApi";
//import { API_ACCOUNT_LIST_URL } from "../constants";

class List extends Component {

  state = {
    accounts: []
  }

  componentDidMount() {

    console.log(localStorage.getItem('access_token'));
    axiosWithJWT.get('/accounts/').then(
      response => {
        const accs = response.data;
        this.setState({
          accounts: accs,
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
            <tr key="headers">
              <th>username</th>
              <th>first name</th>
              <th>last name</th>
              <th>email</th>
              <th>password</th>
              <th>password2</th>
            </tr>
          </thead>
          <tbody>
            {this.state.accounts.map((account, i) => (
              <tr key={"body" + i}>
                <td>{account.username}</td>
                <td>{account.first}</td>
                <td>{account.last}</td>
                <td>{account.email}</td>
                <td>{account.password}</td>
                <td>{account.password2}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Button color="primary" onClick={() => this.props.setPage("landing")}>Back</Button>
      </div>
    )
  }

}

export default List