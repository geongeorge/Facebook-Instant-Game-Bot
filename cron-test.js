var cron = require('node-cron');
const  db = require('./parts/database'),
    sender = require("./sender");

var sendingFlag = false;

// cron.schedule('*/10 * * * * *', () => {
//   console.log('running a task every 10 second');
// });

setTimeout(function() {

    db.getAllUsers().then((usr)=>{
        console.log("user: "+usr.senderId)
        //sender.sendMessageList(usr.senderId)
    })

},3000)
