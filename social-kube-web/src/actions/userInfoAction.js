

export function userInfoAction(profile) {
  return {
    type: 'USER_INFO',
    payload: profile,
  };
}

export default userInfoAction;
