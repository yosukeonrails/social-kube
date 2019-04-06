import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userInfoAction } from '../actions/userInfoAction';
import UserInfoHeader from './UserInfoHeader';

class Header extends Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  login() {
    const { auth } = this.props;
    auth.login();
  }

  logout() {
    const { auth, history, dispatchUserInfoAction } = this.props;
    auth.logout(() => {
      dispatchUserInfoAction(null);
      history.push('/');
    });
  }

  render() {
    console.log(this.props);
    const { userInfo } = this.props;

    const profile = userInfo ? <UserInfoHeader logout={this.logout} userInfo={userInfo} /> : null;
    const loginButton = profile ? null : <button type="button" onClick={this.login}>Log in</button>;
    return (
      <div className="landing-header">
        <h1>Social-Kube  </h1>

        <div className="landing-log-in">
          { profile || loginButton }
        </div>

      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  dispatchUserInfoAction: () => dispatch(userInfoAction()),
});

const mapStateToProps = state => ({
  userInfo: state.userInfoReducer.userInfo,
});
export default connect(mapStateToProps, mapDispatchToProps)(Header);
