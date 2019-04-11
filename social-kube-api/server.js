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

app.post('/addFriend', (req, res)=>{
   User.findOneAndUpdate({user_name: req.body.user_name},{ $push:{friends:req.body.friend} },(err, data)=>{
    console.log(data);
    if(!data){
     return res.status(400).json("something went wrong");
    }
    
    if(err){
      console.log(err);
      res.status(404).json("something went wrong");
    }
   return res.status(200).json("User updated");
   })
})

app.post('/user', (req, res)=>{

  const profile = req.body;

  const userData= {
    user_name:profile? profile.user_name : null,
    given_name:profile? profile.given_name: null,
    family_name:profile? profile.family_name: null,
    nickname:profile? profile.nickname: null,
    picture:profile? profile.picture: null,
    locale:profile? profile.locale: null,
    gender:profile? profile.gender: null,
}
const {user_name, given_name, family_name} = userData;
if(!user_name|| !given_name || !family_name){
  res.status(400).json("User is invalid");
  return;
}

User.findOne({user_name : userData.user_name}, function (err, data) {
    if (data){
      console.log(data);
        res.status(200).json("User updated");
    }else{
      User.findOneAndUpdate(
        { user_name: userData.user_name },
        { $set:userData }, 
        { upsert: true, new: true } , 
        function (err, user) {
          res.status(201).json(user);
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