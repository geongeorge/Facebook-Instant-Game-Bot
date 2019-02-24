// 'use strict';

// Imports dependencies and set up http server
const
  express = require('express'),
  bodyParser = require('body-parser'),
  msg = require("./bot"),
  sender = require("./sender"),
  app = express().use(bodyParser.json()); // creates express http server


app.get("/",(req,res)=> {
    res.send("Webhook running here <code>/webhook</code>");
})

  // Creates the endpoint for our webhook 
app.post('/webhook', (req, res) => {  
 
  var body = req.body;

  // console.log(body)

  body.entry.forEach(function(entry) {

    let event = entry.messaging[0];

    // console.dir(event, { depth: null })
    // console.log(event)
    if (event.game_play) {
      var senderId = event.sender.id; // Messenger sender id psid
      var playerId = event.game_play.player_id; // Instant Games player id
      var contextId = event.game_play.context_id; 

      sender.sendMessageList(senderId)

      res.status(200).send('EVENT_RECEIVED');
    }
  });
});



// Adds support for GET requests to our webhook
app.get('/webhook', (req, res) => {

    // Your verify token. Should be a random string.
    let VERIFY_TOKEN = "i eat potatos"
      
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

const myport = process.env.PORT || 1337;

// Sets server port and logs message on success
app.listen(myport, function() {
  console.log('Webhook up!',"http://localhost:"+myport)
})