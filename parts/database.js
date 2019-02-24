let mongoose = require('mongoose');
const server = '127.0.0.1:27017'; // REPLACE WITH YOUR DB SERVER
const database = 'chatbot';      // REPLACE WITH YOUR DB NAME
const appName = 'yolo';
class Database {
  constructor() {
    this._connect()
  }
_connect() {
     mongoose.connect(`mongodb://${server}/${database}`, {
        useCreateIndex: true,
        useNewUrlParser: true
      })
       .then(() => {
         console.log('Database connection successful')
         this.userSchema =  new mongoose.Schema({
            senderId: { type: String , unique: true},
            contextId: String,
            playerId: String,
            subDate: { type: Date, default: Date.now()},
          });
          this._model()
       })
       .catch(err => {
         console.error('Database connection error')
       })
  }
_model() {
        this.chatSubs = mongoose.model(appName,this.userSchema)
    }
    addUser(usr) {
        this.chatSubs.create(usr,(err,newusr)=> {
            if(err){
                console.log("cannot add user")
            } else {
                console.log(newusr.senderId+" added")
            }
        })
    }
}

module.exports = new Database()