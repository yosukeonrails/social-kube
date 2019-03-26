const express = require('express');
const app = express();
const config= require('./config');
var mongoose = require('mongoose');
const bodyParser= require('body-parser')


app.use(bodyParser.urlencoded({extended: true}))

app.get('/', function(req, res) {
    res.send('Hello World')
  })

  app.get('/streak', (req, res)=>{

  })

 

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