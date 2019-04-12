var cron = require('node-cron');
 
cron.schedule('*/5 * * * * *', () => {
  console.log('running a task every 5 second');
});