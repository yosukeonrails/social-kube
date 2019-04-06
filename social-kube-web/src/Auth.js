import auth0 from 'auth0-js';
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

export default class Auth {
  constructor() {
    this.auth0 = new auth0.WebAuth({
      domain: 'social-kube.auth0.com',
      clientID: 'GY_AiCZ38TIKfd2r4QMvRJ70W0Bo2P1K',
      redirectUri: 'http://localhost:3000/callback',
      responseType: 'token id_token',
      scope: 'openid profile',
    });

    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.getAccessToken = this.getAccessToken.bind(this);
    this.getIdToken = this.getIdToken.bind(this);
    this.renewSession = this.renewSession.bind(this);
    this.getProfile = this.getProfile.bind(this);
  }

  handleAuthentication(redirect) {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult, redirect);
      } else if (err) {
        // TODOL go home
        history.replace('/');
      }
    });
  }

  getAccessToken() {
    return this.accessToken;
  }

  getIdToken() {
    return this.idToken;
  }

  setSession(authResult, redirect) {
    console.log('setting session');
    // Set the time that the access token will expire at
    const expiresAt = (authResult.expiresIn * 1000) + new Date().getTime();
    console.log('GOT access token');
    console.log(authResult.accessToken);
    this.accessToken = authResult.accessToken;
    this.idToken = authResult.idToken;
    this.expiresAt = expiresAt;

    // Set isLoggedIn flag in localStorage
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('accessToken', this.accessToken);
    console.log('authenticated');
    // navigate to the home route
    // TODO: go home
    redirect('/dashboard');
  }

  renewSession() {
    this.auth0.checkSession({}, (err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
      } else if (err) {
        this.logout();
        console.log(err);
        alert(`Could not get a new token (${err.error}: ${err.error_description}).`);
      }
    });
  }

  getProfile(cb, authToken ) {
    this.auth0.client.userInfo(authToken, (err, profile) => {
      if (profile) {
        this.userProfile = profile;
      }
      cb(err, profile);
    });
  }

  logout(cb) {
    // Remove tokens and expiry time
    this.accessToken = null;
    this.idToken = null;
    this.expiresAt = 0;
    this.userProfile = null;
    // Remove isLoggedIn flag from localStorage
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('accessToken');
    // navigate to the home route
    cb();
  }

  isAuthenticated() {
    // Check whether the current time is past the
    // access token's expiry time
    let expiresAt = this.expiresAt;
    return new Date().getTime() < expiresAt;
  }

  login() {
    this.auth0.authorize();
  }
}
