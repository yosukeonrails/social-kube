import React, { Component } from 'react';
import { connect } from 'react-redux';
import getUserProfile from '../helpers/getUserProfile';
import { userInfoAction } from '../actions/userInfoAction';

class Landing extends Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    const { auth, userInfoAction, history } = this.props;

    getUserProfile(
      auth,
      (profile) => {
        userInfoAction(profile);
        history.push('/dashboard');
      },
      (e) => {
        history.replace('/');
      },
    );
  }

  login() {
    const { auth } = this.props;
    auth.login();
  }

  logout() {
    const { auth } = this.props;
    auth.logout();
  }

  render() {
    return (
      <div>
        <h1> LANDING </h1>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  userInfoAction: profile => dispatch(userInfoAction(profile)),
});

const mapStateToProps = state => ({
  userInfo: state.userInfoReducer.userInfo,
});

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
