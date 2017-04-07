var express = require('express'),
      app = express(),
      cors = require('cors'),
      bodyParser = require('body-parser'),
      mongoose = require('./server/db/mongoose'),
      {api} = require('./server/api/api'),
      settings = require('./config'),
      port = process.env.PORT || 8081;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/', express.static(__dirname + '/'));
api(app, mongoose);

// Logging api calls
app.use((req, res, next) => {
  const now = new Date().toString();
  const logMsg = `${now}: ${req.method} ${req.url}\n`;
  console.log(logMsg);
  next();
});

app.listen(port, ()=>{
  console.log('Listening on port ' + port);
});
