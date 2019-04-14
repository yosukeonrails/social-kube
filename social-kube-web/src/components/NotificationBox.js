import React, { Component } from 'react';
import { connect } from 'react-redux';
import { sendRequest } from '../actions/friendsActions';

class NotificationBox extends Component {
  constructor(props) {
    super(props);
    this.handleOnClick = this.handleOnClick.bind(this);
    this.handleHover = this.handleHover.bind(this);
    this.state = {
      hovered: false,
    };
  }

  handleOnClick() {
    return this;
  }

  handleHover(hovered) {
    this.setState({ hovered });
  }

  // reset the clock everytime this goes.
  // create a function only when the timer goes over the treshhold;
  render() {
    const { number, icon } = this.props;
    return (
      <div className="notification-box" onClick={() => { this.props.toggleAction(!this.props.toggled); }} style={{ backgroundColor: this.state.hovered ? 'rgb(175, 175, 175)' : '#f9f9f9' }} onMouseEnter={() => { this.handleHover(true); }} onMouseLeave={() => { this.handleHover(this.props.toggled); }}>
        <img src={icon} />
        <div className={`notification-number ${this.props.number !== 0 ? '' : 'notification-number-off'}`}>
          <p>{this.props.number}</p>
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
export default connect(mapStateToProps, mapDispatchToProps)(NotificationBox);
