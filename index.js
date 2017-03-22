var express = require('express'),
      app = express(),
      cloudinary = require('cloudinary'),
      fs = require('fs'),
      cors = require('cors'),
      bodyParser = require('body-parser'),
      mongoose = require('./server/db/mongoose'),
      {api} = require('./server/api/api'),
      settings = require('./config'),
      port = process.env.port || 8081;

app.use('*', cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
// app.use('/', express.static(__dirname + '/'));
api(app, mongoose, settings );


app.use((req, res, next) => {
  const now = new Date().toString();
  const log = `${now}: ${req.method} ${req.url}\n`;
  fs.appendFile(`server.log`, log, (err)=>{
    if(err) {
      console.log('Unable to find log file');
    }
  });
  next();
});

app.listen(port, ()=>{
  console.log('Listening on port ' + port);
});
