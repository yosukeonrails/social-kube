const express = require('express');
const app = express();
const config= require('./config');
var mongoose = require('mongoose');
const bodyParser= require('body-parser');
require('dotenv').config();
var cors = require('cors');
var jsonParser = bodyParser.json();
var User =  require('./Models/Users')

app.use(jsonParser);
app.use(bodyParser.json());

var engineServer = require('engine.io');

var engineRunningServer = engineServer.listen(5000, {
  pingTimeout: 2000,
  pingInterval: 10000
});

engineRunningServer.on('connection', (socket)=>{
  console.log('Connected')
})

// use it before all route definitions
app.use(cors({origin: 'http://localhost:3000' ,
 credentials:true }));


app.get('/', (req, res)=>{
  console.log('got request')
  res.json("HELLO from server")
})

app.post('/user', (req, res)=>{

  const profile = req.body;

  const userData= {
    user_name:profile.user_name,
    given_name:profile.given_name,
    family_name:profile.family_name,
    nickname:profile.nickname,
    picture:profile.picture,
    locale:profile.locale,
    gender:profile.gender,
}

User.findOne({user_name : profile.user_name}, function (err, data) {

    if (data.user_name == profile.user_name){
        res.status(400).json("user already exists");
    }else{
      User.findOneAndUpdate(
        { user_name: profile.user_name },
        { $set:userData }, 
        { upsert: true, new: true } , 
        function (err, user) {
          console.log(user);
          console.log("Posted User");
          res.status(201).json("done");
      });
    }
});

})


// test a post request from  postman and then client

var runServer = (callback)=> {
  mongoose.connect(config.DATABASE_URL,{ useNewUrlParser: true }, function(err) {
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