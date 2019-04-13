var cron = require('node-cron');
const  db = require('./parts/database'),
    sender = require("./sender");

var sendingFlag = false;

cron.schedule('* */15 * * * *', () => {
    if(sendingFlag) return;
    console.log('running a task every 15 minutes')

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
