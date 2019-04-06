import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/Header';
import './App.scss';
import Auth from './Auth';
import Landing from './components/Landing';
import Loading from './components/Loading';
import Dashboard from './components/Dashboard';

const auth = new Auth();

const AppRouter = () => (
  <Router>
    <Route path="/" render={props => <Header auth={auth} {...props} />} />
    <Route exact path="/" render={props => <Landing auth={auth} {...props} />} />
    <Route
      path="/callback"
      render={props => <Loading loading auth={auth} {...props} />}
    />
    <Route path="/dashboard" render={props => <Dashboard auth={auth} {...props} />} />
  </Router>
);

export default AppRouter;
