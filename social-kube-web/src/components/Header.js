import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userInfoAction } from '../actions/userInfoAction';
import { createBrowserHistory } from 'history';
const history = createBrowserHistory();

class Header extends Component {

    constructor(props){
        super(props);
        this.login= this.login.bind(this);
        this.logout= this.logout.bind(this);
    }
  
    login(){
        this.props.auth.login();
    }
       
    logout() {
        this.props.auth.logout(()=>{
          this.props.userInfoAction(null);
          this.props.history.push('/');
        });
    }

    renderUserInfo(profile){
      if(!profile){
          return;
      }
      return(
         <div>  
          <h3>Hello {profile.given_name} !</h3>
          <button onClick={this.logout}>Log out</button>
          </div>
      );
    }

  render() {
    
    const loginButton =  <button onClick={this.login}>Log in</button>;

    const profile = this.renderUserInfo(this.props.userInfo);
    return (
        <div className="landing-header">
        <h1>Social-Kube    </h1>
 
        <div className="landing-log-in">
        {profile ? profile :loginButton }
        </div> 

        </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  userInfoAction: () => dispatch(userInfoAction())
 })

const mapStateToProps = (state)=>{
return {
  userInfo: state.userInfoReducer.userInfo,
}
} 
export default connect(mapStateToProps, mapDispatchToProps)(Header);;
