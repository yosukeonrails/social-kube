import React, { Component } from 'react';
import getUserProfile from '../helpers/getUserProfile';
import { userInfoAction } from '../actions/userInfoAction';
import { connect } from 'react-redux';

class Landing extends Component {

    constructor(props){
        super(props);
        this.login= this.login.bind(this);
        this.logout= this.logout.bind(this);
    }

    componentDidMount() {
        getUserProfile(
        this.props.auth, 
        (profile)=>{  
            this.props.userInfoAction(profile);
            this.props.history.push('/dashboard');
          },
          (e)=>{
            this.props.history.replace('/');
            });
      }
    
    login(){
        this.props.auth.login();
    }
       
    logout() {
        this.props.auth.logout();
    }

  render() {

    return (
        <div>
        <h1> LANDING </h1>
        </div>

    );
  }
}

const mapDispatchToProps = dispatch => ({
    userInfoAction: (profile) => dispatch(userInfoAction(profile))
   })

const mapStateToProps = (state)=>{
    return {
        userInfo: state.userInfoReducer.userInfo,
    }
} 

   export default connect(mapStateToProps, mapDispatchToProps)(Landing);;

