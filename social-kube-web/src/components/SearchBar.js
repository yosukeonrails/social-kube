import React, { Component } from 'react';
import { connect } from 'react-redux';
import { searchAction } from '../actions/SearchActions';
import searchBarIcon from '../Images/search.svg';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeouts: [],
    };
    this.handleOnChange = this.handleOnChange.bind(this);
  }

  handleOnChange(e) {
    const bufferTime = 500;
    const word = e.target.value;
    const { dispatchSearchAction } = this.props;
    const { timeouts } = this.state;
    const time = setTimeout(() => {
      dispatchSearchAction(word);
    }, bufferTime);

    const timeOuts = timeouts;

    timeOuts.forEach((t) => {
      clearTimeout(t);
    });

    timeOuts.push(time);
    this.setState({
      timeOuts,
    });

    // reset the clock everytime this goes.
    // create a function only when the timer goes over the treshhold;
  }

  render() {
    return (
      <div className="search-bar-container">
        <div className="search-bar">
          <input placeholder="Search..." onChange={this.handleOnChange} />
          <div className="search-icon">
            <img src={searchBarIcon} />
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  dispatchSearchAction: word => dispatch(searchAction(word)),
});

const mapStateToProps = state => ({
  userInfo: state.userInfoReducer.userInfo,
});
export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
