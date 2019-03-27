const express = require('express');
const app = express();
var session = require('express-session');
const config= require('./config');
var mongoose = require('mongoose');
const bodyParser= require('body-parser');
var passport = require('passport');
var Auth0Strategy = require('passport-auth0');
require('dotenv').config();

// new passport strategy
  var strategy = new Auth0Strategy(
    {
      domain: 'social-kube.auth0.com',
      clientID: config.AUTH0_CLIENT_ID,
      clientSecret: config.AUTH0_CLIENT_SECRET,
      callbackURL:
        process.env.AUTH0_CALLBACK_URL || 'http://localhost:8080/callback'
    },
    function (accessToken, refreshToken, extraParams, profile, done) {
      // accessToken is the token to call Auth0 API (not needed in the most cases)
      // extraParams.id_token has the JSON Web Token
      // profile has all the information from the user
      return done(null, profile);
    }
  );

    var sess = {
        secret: config.AUTH0_CLIENT_SECRET,
        cookie: {},
        resave: false,
        saveUninitialized: true
    };

    
    passport.use(strategy);
  
    // You can use this section to keep a smaller payload
    passport.serializeUser(function (user, done) {
         done(null, user);
    });

    passport.deserializeUser(function (user, done) {
           done(null, user);
    });


app.use(bodyParser.urlencoded({extended: true}))

app.use(session(sess));

app.use(passport.initialize());
app.use(passport.session());


//app.use(flash());

// this should go to router
  app.get('/login', passport.authenticate('auth0', {
    scope: 'openid email profile'
  }), function (req, res) {
    res.redirect('/');
  });
  
  app.get('/callback', function (req, res, next) {
      console.log('authenticating......')
    passport.authenticate('auth0', function (err, user, info) {
      if (err) { return next(err); }
      if (!user) { return res.redirect('/login'); }
      req.logIn(user, function (err) {
        if (err) { return next(err); }
        const returnTo = req.session.returnTo;
        delete req.session.returnTo;
        res.redirect(returnTo || '/user');
      });
    })(req, res, next);
  });
  
    app.get('/user', (req, res)=>{
        console.log(req.user);
        if(req.user){
            res.send("HELLO  "+ req.user.name.givenName)
        }
         else {
             res.send("login!")
         }
        
    })

    app.get('/', (req, res)=>{
        res.send("HELLO YOURE in HOME")
   })

   app.get('/logout', (req, res) => {
    req.logout({
        client_id: config.AUTH0_CLIENT_ID,
        returnTo: `http%3A%2F%2Flocalhost:8080`
    });

    res.redirect('/');
  });

var runServer = (callback)=> {
  mongoose.connect(config.DATABASE_URL, function(err) {
      console.log('running at'+ config.DATABASE_URL)
      if (err && callback) {
          return callback(err);
      }
      app.listen( config.PORT, function() {
          console.log('Listening on localhost:' + config.PORT);
          if (callback) {
              callback();
          }
      });
  });
};


if (require.main === module) {
  runServer(function(err) {
      if (err) {
          console.error(err);
      }
  });
}