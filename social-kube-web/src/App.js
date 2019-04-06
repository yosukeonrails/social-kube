import React, { Component } from 'react';
import Header from './components/Header'
import Auth from './Auth';
import Landing from './components/Landing';
import { BrowserRouter as Router, Route , Redirect} from "react-router-dom";

const auth = new Auth();

class App extends Component {

  render() {
    return (
      <div className="App">
      <Router>
       <Header auth={this.props.auth}  />
       <Route exact path="/" render={(props)=>{ return <Landing auth={auth} {...props}/> }}></Route>
      </Router>

      </div>
    );
  }
}

export default App;
