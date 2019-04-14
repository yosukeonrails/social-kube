import React, { Component } from 'react';
import { connect } from 'react-redux';
import { sendRequest } from '../actions/friendsActions';
import addFriendIcon from '../Images/person_add.svg';
import addedFriendIcon from '../Images/check.svg';

class SearchResult extends Component {
  constructor(props) {
    super(props);
    this.sendRequest = this.sendRequest.bind(this);
  }

  sendRequest() {
    const { dispatchFriendActions, user, userInfo } = this.props;

    const body = {
      from: userInfo.user_name,
      to: user.user_name,
    };

    console.log(body);
    dispatchFriendActions(body);
  }

  // reset the clock everytime this goes.
  // create a function only when the timer goes over the treshhold;
  render() {
    const { userInfo, user } = this.props;
    console.log(userInfo);
    const addedIcon = <img className="add-friend-icon" src={addedFriendIcon} />;
    const addIcon = <img onClick={this.sendRequest} className="add-friend-icon" src={addFriendIcon} />;
    console.log(userInfo);
    const icon = !userInfo.request_sent.includes(user.user_name) ? addIcon : addedIcon;

    return (
      <div className="search-result">
        <img src={user.picture} />
        <h1>{`${user.given_name} ${user.family_name}`}</h1>
        {icon}
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
export default connect(mapStateToProps, mapDispatchToProps)(SearchResult);
