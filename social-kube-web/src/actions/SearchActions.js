

// Handle HTTP errors since fetch won't.
function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}

export const getSearchResult = arrayResult => ({
  type: 'SEARCH_RESULT',
  searchResult: { arrayResult },
});

export function searchAction(word) {
  const queryParam = encodeURIComponent(word);
  console.log(queryParam);

  return (dispatch) => {
    if (word.length === 0) {
      dispatch(getSearchResult([]));
      return;
    }

    fetch(`http://localhost:8080/find_user/${queryParam}`).then(handleErrors).then(res => res.json()).then((data) => {
      console.log(data);
      dispatch(getSearchResult(data));
      return data;
    });
  };
}

export default searchAction;
