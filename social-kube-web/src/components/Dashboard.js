import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createBrowserHistory } from 'history';
import { userInfoAction } from '../actions/userInfoAction';
import getUserProfile from '../helpers/getUserProfile';

const history = createBrowserHistory();
const socket = require('engine.io-client')('ws://localhost:5000');

class Dashboard extends Component {
  componentDidMount() {
    const { auth, dispatchUserInfoAction } = this.props;

    getUserProfile(auth,
      (profile) => {
        dispatchUserInfoAction(profile);
        socket.on('open', () => {
          socket.on('message', () => { });
          socket.on('close', () => { });
        });
      },
      () => {
        history.push('/');
      });
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
});

const mapStateToProps = state => ({
  userInfo: state.userInfoReducer.userInfo,
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
