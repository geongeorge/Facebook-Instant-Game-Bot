const TOKEN = "EAAe4DKO6CD4BADW6yxBVwFNubZBf6a0o6PF9ZBecnxqNLRAGTDrf61OJdgxVPmXG19bA6qLCkiIYpwClpy4VxbgVpFNWFLCZARLNfKBeXmIqyM3qH72XqXZBt5xyQNcC1zy3Huiogy30iRzwU1pXniVI6aEtThPWx9v3L1kRdgZDZD"
const API_URL = "https://graph.facebook.com/v2.6/me/messages?access_token="+TOKEN

sendMessage = function(senderId, contextId, msg, btn) {
    let data = {
        "recipient":{
          "id":enderId
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
        dispatch({type: FOUND_USER, data: response.data[0]})
    })
    .catch((error) => {
        dispatch({type: ERROR_FINDING_USER})
    })
}
module.exports.sendMessage = sendMessage