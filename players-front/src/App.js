import React, { Component } from "react";
import Header from "./components/Header";
import Home from "./components/Home";

class App extends Component {

  constructor(props){
    super(props);
    this.headerElement = React.createRef();
    this.homeElement = React.createRef();
  }

  login_clicked = () => {
    this.headerElement.current.update_logged_status();
  }

  logout_clicked = () => {
    this.homeElement.current.setPage("landing");
  }

  render() {
    return (
      <div>
        {/* source for "how to refer": https://www.freecodecamp.org/news/react-changing-state-of-child-component-from-parent-8ab547436271/ */}
        <Header ref={this.headerElement} return_to_landing={this.logout_clicked}/>
        <Home ref={this.homeElement} update_login_state={this.login_clicked}/>
      </div>
    );
  }
}

export default App;
