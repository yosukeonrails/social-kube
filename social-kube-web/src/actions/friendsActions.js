import { userInfoAction } from './userInfoAction';

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

export function sendRequest(request) {
  const body = {
    from: request.from,
    to: request.to,
  };

  console.log(body);

  return (dispatch) => {
    fetch('http://localhost:8080/add_invitation', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    }).then(handleErrors).then(res => res.json()).then((data) => {
      console.log(data);
      console.log('dispatching');
      dispatch(userInfoAction(data));
    });
  };
}

export default sendRequest;
