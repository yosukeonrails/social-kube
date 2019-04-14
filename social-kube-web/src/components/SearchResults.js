import React, { Component } from 'react';
import { connect } from 'react-redux';
import { searchAction } from '../actions/SearchActions';
import SeachResult from './SearchResult';

class SearchResults extends Component {
  constructor(props) {
    super(props);
  }

  // reset the clock everytime this goes.
  // create a function only when the timer goes over the treshhold;
  render() {
    console.log(this.props.searchResult);

    const result = 	this.props.searchResult.map(user => (
      <SeachResult user={user} />
    ));

    return (
      <div className="search-results">
        {result}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  dispatchSearchAction: word => dispatch(searchAction(word)),
});

const mapStateToProps = state => ({
  searchResult: state.searchReducer.searchResult,
});
export default connect(mapStateToProps, mapDispatchToProps)(SearchResults);
