import React, { Component } from "react";
import Header from "./components/Header";
import SignUpForm from "./components/SignUpForm";

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <SignUpForm />
      </div>
    );
  }
}

export default App;
