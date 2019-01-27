// 'use strict';

// Imports dependencies and set up http server
const
  express = require('express'),
  bodyParser = require('body-parser'),
  axios = require('axios'),
  msg = require("./message"),
  app = express().use(bodyParser.json()); // creates express http server


app.get("/",(req,res)=> {
    res.send("hello");
})

  // Creates the endpoint for our webhook 
app.post('/webhook', (req, res) => {  
 
  let event = req.body;

  console.dir(event, { depth: null })
  // console.log(event)

  if (event.game_play) {
    var senderId = event.sender.id; // Messenger sender id
    var playerId = event.game_play.player_id; // Instant Games player id
    var contextId = event.game_play.context_id; 
    // var payload = event.game_play.payload;
    // var playerWon = payload['playerWon'];
    msg.sendMessage(
      senderId, 
      contextId, 
      'Congratulations on your victory!', 
      'Play Again'
    );
  }

  // // Checks this is an event from a page subscription
  // if (body.object === 'page') {

  //   // Iterates over each entry - there may be multiple if batched
  //   body.entry.forEach(function(entry) {

  //     // Gets the message. entry.messaging is an array, but 
  //     // will only ever contain one message, so we get index 0
  //     let webhook_event = entry.messaging[0];
  //     console.log(webhook_event);
  //   });

  //   // Returns a '200 OK' response to all requests
  //   res.status(200).send('EVENT_RECEIVED');
  // } else {
  //   // Returns a '404 Not Found' if event is not from a page subscription
  //   res.sendStatus(404);
  // }

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
app.listen(myport, () => console.log('new webhook is listening at '+myport));

// Handles messages events
function handleMessage(sender_psid, received_message) {

}

// Handles messaging_postbacks events
function handlePostback(sender_psid, received_postback) {

}

// Sends response messages via the Send API
function callSendAPI(sender_psid, response) {
  
}


// {
//   "sender": {
//     "id": "<PSID>"
//   },
//   "recipient": {
//     "id": "<PAGE_ID>"
//   },
//   "timestamp": 1469111400000,
//   "game_play": {
//     "game_id": "<GAME-APP-ID>",
//     "player_id": "<PLAYER-ID>",
//     "context_type": "<CONTEXT-TYPE:SOLO|THREAD>",
//     "context_id": "<CONTEXT-ID>", # If a Messenger Thread context
//     "score": <SCORE-NUM>, # If a classic score based game
//     "payload": "<PAYLOAD>" # If a rich game
//   }
// }