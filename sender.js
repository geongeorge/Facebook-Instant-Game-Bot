const request= require("request")
const TOKEN = "EAAe4DKO6CD4BAK0bdwEX4XgZCppkYFon5Bwfh9TvI87ZCL4Bn9l4c8gx2uK3C8Vvt8iLltF6CNGpaHK7XC47jnlqggAlIZAZANMTWkFZCVF2OXTSVp8Uv0PsM5FA2r3rI4RIDm7E9jZBreP9pxKYXkMZClOIZCdVez4oKF4Wg96nYwZDZD"
const apiUrl = "https://coingeany.com/yolo/api/apps"

function generateStr({playerId, title, image_url,subtitle,app_id}) {
    let finalList = {
        "recipient":{
          "id": playerId
        }, 
        "message": {
          "attachment": {
            "type": "template",
            "payload": {
                "template_type":"generic",
              "elements": [
                       {
                        "title": title,
                        "image_url": image_url,
                        "subtitle": subtitle,
                        "default_action": {
                          "type":"game_play",
                          "payload": JSON.stringify({app: app_id}),
                        },
                        "buttons": [{
                            "type":"game_play",
                            "title":"Play",
                          "payload": JSON.stringify({app: app_id}),
                        }]
                      },

                    ],  
            }
          }
        }   
    }

    return finalList
}

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }


function generateMsg(playerId){
    return new Promise(function(resolve, reject) {
        request({
            url: apiUrl,
            method: "GET",
            json: true,
        }, function (error, response, body){
            let myapps = shuffle(response.body.apps)
            
            let ele = myapps[0]
            
            var newMsg = generateStr({
                playerId,
              title: ele.title,
              subtitle: ele.descr,
              image_url: ele.f_image,
              app_id: ele.id
            })

            resolve(newMsg)
        });
    });
}
function sendMessageList(playerId) {
    generateMsg(playerId).then(msgData => {
        // console.log(msgData)
        callSendAPI(msgData)
    })
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

module.exports = {
    generateStr,
    generateMsg,
    sendMessageList,
    callSendAPI
};
