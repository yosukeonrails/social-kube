

export function userInfoAction(profile) {
  return {
    type: 'USER_INFO',
    payload: profile,
  };
}

export function getUserProfile(auth) {
  return (dispatch) => {
    const { accessToken } = localStorage;
    auth.getProfile((err, profile) => {
      if (err) {
        console.log('got error');
        console.log(err);
      }
      return fetch('http://localhost:8080/user',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            user_name: profile ? profile.user_name || profile.sub : null,
            given_name: profile ? profile.given_name : null,
            family_name: profile ? profile.family_name : null,
            nickname: profile ? profile.nickname : null,
            picture: profile ? profile.picture : null,
            locale: profile ? profile.locale : null,
            gender: profile ? profile.gender : null,
          }),
        }).then((res) => {
        switch (res.status) {
          case 200:
            dispatch(userInfoAction(profile));
            break;
          case 201:
          // user created without a problem
          // but its for the first time so seting up might be needed
            dispatch(userInfoAction(profile));
            break;
          case 400:
          // need to create user.
            dispatch(userInfoAction(profile));
            break;

          default:
            break;
        }
      });
    }, accessToken);
  };
}
