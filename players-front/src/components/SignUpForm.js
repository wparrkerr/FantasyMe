import React from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";

import axios from "axios";
import { API_SIGNUP_URL } from "../constants"; 
// http://localhost:8000/api/accounts/

class SignUpForm extends React.Component {
  state = {
    username: "",
    email: "",
    password: "",
    password2: ""
  }

  componentDidMount() {
     axios.get(API_SIGNUP_URL).then(
       res => this.setState({accounts: res.data})
     ).catch(
       (error) => {window.alert(error)}
     )
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  createAccount = e => {
    e.preventDefault(); // so that page doesn't reload
    axios.post(API_SIGNUP_URL, this.state)
    .then(() => {
      window.alert("Successfully Signed Up!");
      // do something after
    })
    .catch((error) => {
      window.alert(error + "... maybe email is not correct form");
    });
  };

  render() {
    return (
      <div>
        <h2>Sign Up</h2>
        <Form onSubmit={this.createAccount}>
          <FormGroup>
            <Label for = "user">Username:</Label>
            <Input type = "text" name = "username" onChange = {this.onChange}/>
          </FormGroup>
          <FormGroup>
            <Label for = "email">Email Address:</Label>
            <Input type = "text" name = "email" onChange = {this.onChange}/>
          </FormGroup>
          <FormGroup>
            <Label for = "pass">Password:</Label>
            <Input type = "text" name = "password" onChange = {this.onChange}/>
          </FormGroup>
          <FormGroup>
            <Label for = "pass2">Confirm Password:</Label>
            <Input type = "text" name = "password2" onChange = {this.onChange}/>
          </FormGroup>
          <Button>Sign Up</Button>
        </Form>
        <Button color="primary" onClick={() => this.props.setPage("landing")}>Back</Button>
      </div>
    )
  }

}

export default SignUpForm