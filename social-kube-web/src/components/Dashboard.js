import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createBrowserHistory } from 'history';
import { userInfoAction, getUserProfile } from '../actions/userInfoAction';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import NotificationsBar from './NotificationsBar';

const history = createBrowserHistory();
const socket = require('engine.io-client')('ws://localhost:5000');

class Dashboard extends Component {
  componentDidMount() {
    const { auth, dispatchGetUserProfile } = this.props;
    console.log('getting profile');
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
    const notificationBar = this.props.userInfo ? <NotificationsBar /> : null;

    return (
      <div>
        <div className="search-box-container">
          <SearchBar />
          <SearchResults />
        </div>
        {notificationBar}
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
