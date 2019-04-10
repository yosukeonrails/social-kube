import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createBrowserHistory } from 'history';
import { userInfoAction, getUserProfile } from '../actions/userInfoAction';

const history = createBrowserHistory();
const socket = require('engine.io-client')('ws://localhost:5000');

class Dashboard extends Component {
  componentDidMount() {
    const { auth, history, dispatchGetUserProfile } = this.props;
    dispatchGetUserProfile(auth);
  }

  componentDidUpdate() {
    const { userInfo } = this.props;

    console.log(userInfo);
    if (!userInfo) {
      console.log('pushing');
      history.push('/');
    }
  }

  render() {
    return (
      <div className="App">
        <h1> Dashboard</h1>
      </div>
    );
  }
}


const mapDispatchToProps = dispatch => ({
  dispatchUserInfoAction: profile => dispatch(userInfoAction(profile)),
  dispatchGetUserProfile: auth => dispatch(getUserProfile(auth)),
});

const mapStateToProps = state => ({
  userInfo: state.userInfoReducer.userInfo,
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
