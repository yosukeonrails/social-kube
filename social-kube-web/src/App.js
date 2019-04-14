import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import Header from './components/Header';
import Auth from './Auth';
import Landing from './components/Landing';

const auth = new Auth();

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Header auth={this.props.auth} />
          <Route exact path="/" render={props => <Landing auth={auth} {...props} />} />
        </Router>
      </div>
    );
  }
}

export default App;
