// 'use strict';

// Your verify token. Should be a random string.
const VERIFY_TOKEN = "i eat potatos"
const myport = 1337;

// Imports dependencies and set up http server
const
  express = require('express'),
  bodyParser = require('body-parser'),
  db = require('./parts/database'),
  sender = require("./sender"),
  app = express().use(bodyParser.json()); // creates express http server

var cron = require('node-cron');


app.get("/",(req,res)=> {
    res.send("Webhook running here <code>/webhook</code>");
})

  // Creates the endpoint for our webhook 
app.post('/webhook', (req, res) => {  
 
  var body = req.body;

  // console.log(body)

  body.entry.forEach(function(entry) {

    let event = entry.messaging[0];

    //if (event.game_play) {
    if (event.sender.id) { 

      var senderId = event.sender.id; // Messenger sender id psid
      //var playerId = event.game_play.player_id; // Instant Games player id
      //var contextId = event.game_play.context_id;

      var playerId = 000; // Instant Games player id
      var contextId = 000;
      
      db.addUser({
        senderId,
        contextId,
        playerId
      });

      sender.sendMessageList(senderId)

      res.status(200).send('EVENT_RECEIVED');
    }
  });
});



// Adds support for GET requests to our webhook
app.get('/webhook', (req, res) => {

      
    // Parse the query params
    let mode = req.query['hub.mode'];
    let token = req.query['hub.verify_token'];
    let challenge = req.query['hub.challenge'];
      
    // Checks if a token and mode is in the query string of the request
    if (mode && token) {
    
      // Checks the mode and token sent is correct
      if (mode === 'subscribe' && token === VERIFY_TOKEN) {
        
        // Responds with the challenge token from the request
        console.log('WEBHOOK_VERIFIED');
        res.status(200).send(challenge);
      
      } else {
        // Responds with '403 Forbidden' if verify tokens do not match
        res.sendStatus(403);      
      }
    }
  });



// Sets server port and logs message on success
app.listen(myport, function() {
  console.log('Webhook up!',"http://localhost:"+myport)
})

//cron job

var sendingFlag = false;

cron.schedule('*/20 * * * *', () => {
    console.log('running a task every 20 minutes')
    if(sendingFlag) {
      console.log('skipped')
      return
    }

    sendingFlag = true

    db.getAllUsers().then((users)=>{
        users.forEach((usr,index) => {
            console.log("sending msg to "+usr.senderId)
            sender.sendMessageList(usr.senderId)

            if(index+1==users.length)
                sendingFlag = false
        });
    })
});