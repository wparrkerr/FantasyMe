import React, { Component } from "react";
import { Table } from "reactstrap";
import './styles/Header.css';

// API
import axios from "axios";
import { API_URL } from "../constants"; 

class List extends Component {

  state = {
    accounts: []
  }

  componentDidMount() {
    axios.get(API_URL).then(
      res => this.setState({accounts: res.data})
    ).catch(
      (error) => {window.alert(error)}
    )
  }

  render() {
    return (
      <Table>
        <thead>
          <tr>
            <th>username</th>
            <th>first name</th>
            <th>last name</th>
            <th>email</th>
            <th>password</th>
            <th>password2</th>
          </tr>
        </thead>
        <tbody>
          <p>API don't work</p>
          {this.state.accounts.map(account => (
            <tr>
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
    )
  }

}

export default List