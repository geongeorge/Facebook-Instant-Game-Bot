const TOKEN = "EAAe4DKO6CD4BAFZBeLv3TdKyTi9aLf6ynSKh31xtQ0sPyR2XoKfcRMDh7kaw8QcBZAFz4mfgtbkmSOx87sZCGZB8VC0LSR3ZB38S0qT5yQjbaGo9oedKhr4RiZAgLmgf1WKNGFiDny2qUY9ICcGFy3E3d46eKIJn9rb2k3g7QmWgZDZD"
const API_URL = "https://graph.facebook.com/v2.6/me/messages?access_token="+TOKEN

axios = require('axios')

sendMessage = function(senderId, contextId, msg, btn) {
    let data = {
        "recipient":{
          "id":senderId
        },
        "message":{
          "text":msg
        },
        "buttons": [
            {
                "type":"game_play",
                "title":btn,
                "payload":"{}",
                "game_metadata": { // Only one of the below
                    "player_id": senderId
                }
            }
        ]
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
        console.log(error)
        // dispatch({type: ERROR_FINDING_USER})
    })
}
module.exports.sendMessage = sendMessage