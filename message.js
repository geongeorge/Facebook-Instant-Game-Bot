const TOKEN = "EAAe4DKO6CD4BAK0bdwEX4XgZCppkYFon5Bwfh9TvI87ZCL4Bn9l4c8gx2uK3C8Vvt8iLltF6CNGpaHK7XC47jnlqggAlIZAZANMTWkFZCVF2OXTSVp8Uv0PsM5FA2r3rI4RIDm7E9jZBreP9pxKYXkMZClOIZCdVez4oKF4Wg96nYwZDZD"
const API_URL = "https://graph.facebook.com/v2.6/me/messages?access_token="+TOKEN

const axios = require('axios')

sendMessage = function(playerId, contextId, msg, btn) {
    let data = {
        "recipient":{
          "id":playerId
        },
        "message":{
          "attachment":{
            "type":"template",
            "payload":{
              "template_type":"button",
              "text":"Try the game play button!",
              "buttons":[
                {
                  "type":"game_play",
                  "title":"Play",
                  "payload":"{}",
                  "game_metadata": { 
                    "player_id": playerId
                  }
                }
              ]
            }
          }
        }
      }

    axios.post(API_URL, {
        headers: {
            'Content-Type': 'application/json',
        },
        data
    })

    .then((response) => {
        console.log("Success message sent")
        // dispatch({type: FOUND_USER, data: response.data[0]})
    })
    .catch((error) => {
        console.log("Error: User not found")
        // dispatch({type: ERROR_FINDING_USER})
    })
}

callSendAPI = function(sender_psid, response) {
    // Construct the message body
    let request_body = {
      "recipient": {
        "id": sender_psid
      },
      "message": response
    }
  
    // Send the HTTP request to the Messenger Platform
    request({
      "uri": "https://graph.facebook.com/v2.6/me/messages",
      "qs": { "access_token": TOKEN },
      "method": "POST",
      "json": request_body
    }, (err, res, body) => {
      if (!err) {
        console.log('message sent!')
      } else {
        console.error("Unable to send message:" + err);
      }
    }); 
  }
module.exports.sendMessage = sendMessage
module.exports.callSendAPI = callSendAPI