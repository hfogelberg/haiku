var mongoose = require('mongoose');

// Set up Mongo
mongoose.Promise = global. Promise;
// localhost
mongoose.connect('mongodb://localhost:27017/haiku');
// Dokku
//mongoose.connect('mongodb://172.17.0.5');
mongoose.connection
    .once('open', () => {console.log('DB connection open');})
    .on('error', (err)=>{console.log('Warning', err);});

mongoose.export = {mongoose};
