import React, { Component } from 'react';
import { connect } from 'react-redux';
import { sendRequest } from '../actions/friendsActions';
import personsIcon from '../Images/persons.svg';
import mailIcon from '../Images/mail.svg';
import messageIcon from '../Images/message.svg';
import NotificationBox from './NotificationBox';

class NotificationsBar extends Component {
  constructor(props) {
    super(props);
    this.handleOnClick = this.handleOnClick.bind(this);
    this.toggleDropDown = this.toggleDropDown.bind(this);
    this.state = {
      friendRequestToggled: false,
    };
  }

  handleOnClick() {
    return this;
  }

  toggleDropDown(toggled) {
    console.log(toggled);
    this.setState({
      friendRequestToggled: toggled,
    });
  }

  // reset the clock everytime this goes.
  // create a function only when the timer goes over the treshhold;
  render() {
    const { userInfo } = this.props;

    const numberStyles = {
      friends: null,
      mails: null,
      messages: null,
    };

    let friendRequestNumber;

    if (userInfo) {
      friendRequestNumber = userInfo.friend_requests.length;
      numberStyles.friends = userInfo.friend_requests.length === 0
        ? null : userInfo.friend_requests.length;
    }

    return (
      <div className="notification-bar-container">
        <NotificationBox icon={personsIcon} toggled={this.state.friendRequestToggled} toggleAction={this.toggleDropDown} number={userInfo.friend_requests.length} />
        <NotificationBox icon={messageIcon} number={userInfo.friend_requests.length} />
        <NotificationBox icon={mailIcon} number={userInfo.friend_requests.length} />

        <div style={{ display: this.state.friendRequestToggled ? 'block' : 'none' }}>
          <div className="dropdown-arrowup" />
          <div className="friend-request-dropdown" />
        </div>

      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  dispatchFriendActions: body => dispatch(sendRequest(body)),
});

const mapStateToProps = state => ({
  userInfo: state.userInfoReducer.userInfo,
});
export default connect(mapStateToProps, mapDispatchToProps)(NotificationsBar);
