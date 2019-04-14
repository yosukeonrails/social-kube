const express = require('express');
const app = express();
const config= require('./config');
var mongoose = require('mongoose');
const bodyParser= require('body-parser');
require('dotenv').config();
var cors = require('cors');
var jsonParser = bodyParser.json();
var User =  require('./Models/Users')
var Utils =  require('./Shared/Utils')
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

// Find all friends in the friend list.
app.get('/friends_of/:user_name', (req, res)=>{
const userName= req.params.user_name;
    User.findOne({user_name:userName}, (err, user)=>{

      if(err||user==null){
        res.status(404).json("something went wrong");
      }

      User.find({user_name: { $in: user.friends }}, (err, data)=>{
        if(err){
          res.status(404).json("something went wrong");
        }
          res.json(data);
      })
    })
})

// Accept friend 
// TODO: How to do this more efficiently?
// TODO: how error handle so that 
// if one thing goes wrong everything wil go wrong

app.post('/accept_friend_request', (req, res)=>{
 
  var { user_name, accepting_user } =  req.body;

    User.findOneAndUpdate(
      {user_name:user_name},
      {$pull:{friend_requests: accepting_user }}, 
      (err, data)=>{
        
        if(err||data==null){
          // here we need to start whole process over? 
          res.status(404).json("something went wrong");
        }

      User.findOneAndUpdate( {user_name:user_name},{$push:{friends:accepting_user}},(err, data)=>{

        console.log(data);
          res.status(200).json(data);

          User.findOneAndUpdate({user_name:accepting_user}, {$push:{friends:user_name}},(err, data)=>{

            console.log(data);
            res.status(200).json(data);
  
        });
      });
    })
})

// this could be done in one call 
// like this: https://website.com/example?myarray[]=136129&myarray[]=137794&myarray[]=137792

// Find one or many that contains that query

app.get('/find_user/:query',(req, res)=>{

const {query} = req.params;
console.log('params')
console.log(req.params)


var searchQuery  = { $search : query }
if(query.indexOf(' ') !== -1){
  console.log("here with backslash")
 searchQuery =  { $search:  "\""+query+"\"" }
}

console.log(searchQuery)

// To exclude characters db.stores.find( { $text: { $search: "java shop -coffee" } } )
// to get exact db.stores.find( { $text: { $search: "\"coffee shop\"" } } )
User.find({ $text: searchQuery } , (err, data)=>{
  console.log(data);
  console.log(err);
  if(err){
    res.status(404).json("something went wrong");
  }
  res.status(200).json(data);
})
})

// Find 
app.get('/friends_by_array', function(req,res){
  var friendList = req.query.friends;
  User.find({user_name: { $in: friendList }}, (err, data)=>{
    if(err){
      res.status(404).json("something went wrong");
    }
      res.json(data);
  })
});

// TODO: POST, GET images
//https://stackoverflow.com/questions/4796914/store-images-in-a-mongodb-database


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
    full_name: profile? profile.given_name+" "+profile.family_name  : null,
}

console.log(userData);

const {user_name, given_name, family_name} = userData;

if(!user_name|| !given_name || !family_name){
  res.status(400).json("User is invalid");
  return;
}

console.log(userData.full_name);
User.findOneAndUpdate(
  { user_name: userData.user_name },
  { $set:userData }, 
  { upsert: true, new: true } , 
  function (err, user) {
    res.status(201).json(user);
});

})

// Find a user and add an invitation based on the current user id 
app.post('/add_invitation/' , (req, res)=>{

   const {from ,to} =  req.body;

  console.log(req.body);
  User.findOneAndUpdate({user_name:to},{$push: {friend_requests: from } }, (err , data)=>{

    if(err){
      console.log(err);
     return res.status(404).json("something went wrong");
    }

    User.findOneAndUpdate({user_name:from} , {$push: {request_sent: to }}, {new: true}, (err, data)=>{
      console.log('add to sent request');
      console.log(data);
      // this needs to sent back the updated Json.
         return  res.json(data);
    });

  })
})

// Get all invitations friendlist based on the user


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