import React, { Component } from 'react';

class Loading extends Component {
  constructor(props) {
    super(props);
    this.redirectToDashboard = this.redirectToDashboard.bind(this);
  }

  redirectToDashboard() {
    const { history, auth, location } = this.props;
    if (/access_token|id_token|error/.test(location.hash)) {
      auth.handleAuthentication(history.push);
    }
  }

  render() {
    const { loading } = this.props;

    if (loading) {
      console.log('redirecting ');
      this.redirectToDashboard();
    }
    return (
      <div className="App">
        <h1> Loading...</h1>
      </div>
    );
  }
}

export default Loading;
