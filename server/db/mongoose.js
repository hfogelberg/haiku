let mongoose = require('mongoose');

// Set up Mongo
mongoose.Promise = global. Promise;
mongoose.connect('mongodb://localhost:27017/flashcards');
mongoose.connection
    .once('open', () => {console.log('DB connection open');})
    .on('error', (err)=>{console.log('Warning', err);});

mongoose.export = {mongoose};
