import React, { Component } from "react";
import Header from "./components/Header";
import SignUpForm from "./components/SignUpForm";
import Home from "./components/Home";

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Home />
        {/* <SignUpForm /> */}
      </div>
    );
  }
}

export default App;
