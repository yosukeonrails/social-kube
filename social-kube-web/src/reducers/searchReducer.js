// import { handle } from 'redux-pack';

const stateDefault = {
  searchResult: [],
};

export default (state = stateDefault, action) => {
  switch (action.type) {
    case 'SEARCH_RESULT':
      return {
        searchResult: action.searchResult.arrayResult,
      };
    default:
      return state;
  }
};
