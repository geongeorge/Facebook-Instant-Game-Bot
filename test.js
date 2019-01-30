const request= require("request")
const TOKEN = "EAAe4DKO6CD4BAK0bdwEX4XgZCppkYFon5Bwfh9TvI87ZCL4Bn9l4c8gx2uK3C8Vvt8iLltF6CNGpaHK7XC47jnlqggAlIZAZANMTWkFZCVF2OXTSVp8Uv0PsM5FA2r3rI4RIDm7E9jZBreP9pxKYXkMZClOIZCdVez4oKF4Wg96nYwZDZD"
function generateListItem(title,image_url, app_id){
    let jsonItem = 
    {
        "title": title,
        "image_url": image_url,
        "buttons": [
          {
              "type":"game_play",
              "title":"Play",
              "payload": JSON.stringify({app: app_id}),
            //   "game_metadata": { 
            //     "player_id": playerId
            //   }
            }
        ]        
      }
      return jsonItem
}

function generateList(playerId, itemList) {
    let finalList = {
        "recipient":{
          "id": playerId
        }, 
        "message": {
          "attachment": {
            "type": "template",
            "payload": {
              "template_type": "list",
              "top_element_style": "compact",
              "elements": itemList,
               "buttons": [
                {
                    "type":"game_play",
                    "title":"Play"
                }
              ]  
            }
          }
        }   
    }

    return finalList
}

function generateMsg(playerId){
    return new Promise(function(resolve, reject) {
        request({
            url: "https://coingeany.com/potato/api/apps",
            method: "GET",
            json: true,
        }, function (error, response, body){
            let myapps = response.body.apps
            let count = 0;
            var msgList = [];
            while(count<4 && myapps.length>4){
                let ele = myapps[count]
                let mylistitem =  generateListItem(ele.title,ele.f_image, ele.id)
                msgList.push(mylistitem)
                console.log(mylistitem)
                count++
            }
            var finalList = generateList(playerId,msgList)

            resolve(finalList)
        });
    });
}
function sendMessageList(playerId) {
    generateMsg(playerId).then(msgData => {
        console.log(msgData)
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
    generateList,
    generateListItem,
    generateMsg,
    sendMessageList,
    callSendAPI
};