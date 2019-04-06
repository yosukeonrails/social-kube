import React, { Component } from 'react';

class Loading extends Component {

  constructor(props){
    super(props);
    this.redirectToDashboard = this.redirectToDashboard.bind(this);
  }

  redirectToDashboard(){
    const { history } = this.props;
    if (/access_token|id_token|error/.test(this.props.location.hash)) {
      this.props.auth.handleAuthentication( history.push );
    }
}

  render() {

    if(this.props.loading ){
        console.log("redirecting ")
        this.redirectToDashboard();
    }
;    return (
      <div className="App">
        <h1> Loading...</h1>
      </div>
    );
  }
}

export default Loading;
