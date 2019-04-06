// export const userInfoAction = (payload) => dispatch => {
//     console.log(payload);
//     dispatch({
//      type: 'USER_INFO',
//      payload: payload
//     })
//    }

   export function userInfoAction(profile){
       console.log(profile);
    return {
      type:'USER_INFO',
      payload:profile,
    }
  }
