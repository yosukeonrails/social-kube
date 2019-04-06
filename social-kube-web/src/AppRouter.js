import React from "react";
import Header from './components/Header';
import Auth from './Auth';
import './App.scss';
import Landing from './components/Landing';
import Loading from './components/Loading';
import Dashboard from './components/Dashboard';
import { BrowserRouter as Router, Route , Redirect} from "react-router-dom";

const auth = new Auth();

class AppRouter extends React.Component  {

 render(){
   return(
    <Router>
     <Route  path="/"  render={(props) => <Header auth={auth}  {...props} />} />  
     <Route exact path="/" render={(props)=>{ return <Landing auth={auth} {...props}/> }}></Route>
     <Route path="/callback" render={(props) => {
        return <Loading loading={true} auth={auth} {...props} /> 
        }}/>  
    <Route  path="/dashboard" render={(props) =>{ return <Dashboard auth={auth} {...props}/> }} />
    </Router>
   );
 }
}



export default AppRouter;