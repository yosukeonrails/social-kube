const getUserProfile =( auth, successCb, errorCb)=>{

    var accessToken = localStorage.accessToken;

    if(accessToken){

       auth.getProfile((err, profile)=>{

        if(err){
          // redirect to lgo in page
          errorCb(err)
        } 
        // dispatch action
        successCb(profile)

     }, accessToken);

      } else {
        // redirect to login page
        errorCb("redirecting ");
      }

}

export default getUserProfile; 