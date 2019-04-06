import React, { Component } from 'react';
import { userInfoAction } from '../actions/userInfoAction';
import { connect } from 'react-redux';
import getUserProfile from '../helpers/getUserProfile';
import { createBrowserHistory } from 'history';
const history = createBrowserHistory();
var socket = require('engine.io-client')('ws://localhost:5000');

class Dashboard extends Component {

  componentDidMount() {
    getUserProfile(
      this.props.auth,
      (profile) => {
        this.props.userInfoAction(profile)
        socket.on('open', function () {
          socket.on('message', function (data) { });
          socket.on('close', function () { });
        });

      },
      (e) => {
        history.push('/')
      });
  }

  componentDidUpdate() {
    if (!this.props.userInfo) {
      console.log('pushing')
      history.push('/')
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
  userInfoAction: (profile) => dispatch(userInfoAction(profile))
})

const mapStateToProps = (state) => {
  return {
    userInfo: state.userInfoReducer.userInfo,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);;
