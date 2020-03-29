import React from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { isValid } from './helpers/token_helpers.js'

//import axios from "axios";
import axiosWithJWT from "../axiosApi";

class LoginForm extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      username: "",
      password: "",
    }
    this.logIn = this.logIn.bind(this)
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  async logIn(e) {
    e.preventDefault();
    try {
        const data = await axiosWithJWT.post('/token/obtain/', {
            username: this.state.username,
            password: this.state.password
        });
        axiosWithJWT.defaults.headers['Authorization'] = "JWT " + data.data.access;
        console.dir(data, {depth:null})
        console.log(data.data.access)
        localStorage.setItem('access_token', data.data.access);
        localStorage.setItem('refresh_token', data.data.refresh);
        this.props.setPage("user_goals") // redirect to user goals page
        this.props.update_login_state();
        return data;
    } catch (error) {
        throw error;
    }
  };

  render() {
    return (
      <div>
        <h2>Log In</h2>
        <Form onSubmit={this.logIn}>
          <FormGroup>
            <Label for = "user">Username:</Label>
            <Input type = "text" name = "username" onChange = {this.onChange}/>
          </FormGroup>
          <FormGroup>
            <Label for = "pass">Password:</Label>
            <Input type = "text" name = "password" onChange = {this.onChange}/>
          </FormGroup>
          <Button>Log In</Button>
        </Form>
        <Button color="primary" onClick={() => this.props.setPage("landing")}>Back</Button>
      </div>
    )
  }
}

export default LoginForm