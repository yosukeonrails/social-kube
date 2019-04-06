import {handle} from 'redux-pack';

const stateDefault = {
    userInfo: null,
}


export default (state , action) => {

    state = state || stateDefault;

    switch (action.type) {
     case 'USER_INFO':
      return {
       userInfo: action.payload
      }

      case 'LOG_OUT':

       return handle(state, action, {

         failure: s => ({ ...s, logOutError:action.payload }),

         success: s => ({ ...s, loggedUser:"" }),

       });

     default:
      return state
    }
   }

