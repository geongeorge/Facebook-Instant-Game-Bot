const TOKEN = "EAAe4DKO6CD4BANC3bPvLsxHSWwXt3mLd5upHBhxPZC2UXUkZCBh2h5P0HqRRRiHFU4KcECmMjHDioGY7WILV6ZBwmQWf2ZCl4MQReH2YX6a9I8pvmiEsBZBxrQRb7kzDsgPrz00Ak2BPAqxOBIXGH6C2CXeCS0mv8kT1cmXHLhwZDZD"
const API_URL = "https://graph.facebook.com/v2.6/me/messages?access_token="+TOKEN

const axios = require('axios')

sendMessage = function(senderId, contextId, msg, btn) {
    let data = {
        "recipient":{
          "id":senderId
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
                    "player_id": "4590736473645"
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
        console.log(response)
        // dispatch({type: FOUND_USER, data: response.data[0]})
    })
    .catch((error) => {
        console.log(error.response)
        // dispatch({type: ERROR_FINDING_USER})
    })
}
module.exports.sendMessage = sendMessage