const TOKEN = "EAAe4DKO6CD4BAK0bdwEX4XgZCppkYFon5Bwfh9TvI87ZCL4Bn9l4c8gx2uK3C8Vvt8iLltF6CNGpaHK7XC47jnlqggAlIZAZANMTWkFZCVF2OXTSVp8Uv0PsM5FA2r3rI4RIDm7E9jZBreP9pxKYXkMZClOIZCdVez4oKF4Wg96nYwZDZD"
const API_URL = "https://graph.facebook.com/v2.6/me/messages?access_token="+TOKEN

const request= require("request")

function sendMessage(player, message, cta=null,context=null, payload=null) {
    var button = {
        type: "game_play",
        title: "Play Game"
    };
    if (cta) {
        button.title = cta;
    }
    if (context) {
        button.context = context;
    }
    if (payload) {
        button.payload = JSON.stringify(payload)
    }
    var messageData = {
        recipient: {
            id: player
        },
        message: {
            attachment: {
                type: "template",
                payload: {
                    template_type: "generic",
                    elements: [
                    {
                        title: message,
                        buttons: [button]
                    }
                    ]
                }
            }
        }
    };

    callSendAPI(messageData);

}

function callSendAPI(messageData) {
    var graphApiUrl = 'https://graph.facebook.com/me/messages?access_token='+TOKEN
    request({
        url: graphApiUrl,
        method: "POST",
        json: true,  
        body: messageData
    }, function (error, response, body){
        console.error('send api returned', 'error', error, 'status code', response.statusCode, 'body', body);
    });
}



module.exports.sendMessage = sendMessage
module.exports.callSendAPI = callSendAPI
