var mongoose = require('mongoose'),
      bluebird = require('bluebird');

// Set up Mongo
// mongoose.Promise = global. Promise;
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost:27017');
mongoose.connection
    .once('open', () => {console.log('DB connection open');})
    .on('error', (err)=>{console.log('Warning', err);});

mongoose.export = {mongoose};
