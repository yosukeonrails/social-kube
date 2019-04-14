export function userInfoAction(profile) {
  console.log('here is user');
  console.log(profile);
  return {
    type: 'USER_INFO',
    payload: profile,
  };
}


export function getUserProfile(auth) {
  return (dispatch) => {
    const { accessToken } = localStorage;
    auth.getProfile(

      (err, profile) => {
        const body = {
          user_name: profile ? profile.user_name || profile.sub : null,
          given_name: profile ? profile.given_name : null,
          family_name: profile ? profile.family_name : null,
          nickname: profile ? profile.nickname : null,
          picture: profile ? profile.picture : null,
          locale: profile ? profile.locale : null,
          gender: profile ? profile.gender : null,
        };

        return fetch('http://localhost:8080/user',
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
          }).then(res => res.json()).then((data) => {
          console.log(data);
          dispatch(userInfoAction(data));
        });
      }, accessToken,
    );
  };
}
