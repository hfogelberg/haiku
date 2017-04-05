var express = require('express'),
      app = express(),
      cors = require('cors'),
      bodyParser = require('body-parser'),
      mongoose = require('mongoose'),
      bluebird = require('bluebird'),
      winston = require('winston'),
      {api} = require('./server/api/api'),
      settings = require('./config'),
      port = process.env.PORT || 8081;

winston.add(
  winston.transports.File, {
    filename: 'default.log',
    level: 'info',
    json: true,
    eol: 'rn',
    timestamp: true
  }
)


// DB config
var dbUri = '';
winston.info('IS_LOCAL: ' + settings.IS_LOCAL)
if (settings.IS_LOCAL) {
  winston.info('Hooking up to dev Db');
  dbUri = 'mongodb://localhost:27017/haiku'
} else {
  winston.info('Hooking up to prod Db');
  dbUri = 'mongodb://172.17.0.3:27017'
}

winston.info('Db connection to open: ' + dbUri);
mongoose.connect(dbUri);
mongoose.connection
    .once('open', () => {winston.info('DB connection open');})
    .on('error', (err)=>{winston.info('Error', err);});

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/', express.static(__dirname + '/'));
api(app, mongoose, winston );

// Logging api calls
app.use((req, res, next) => {
  const now = new Date().toString();
  const logMsg = `${now}: ${req.method} ${req.url}\n`;
  winston.info(logMsg);
  next();
});

app.listen(port, ()=>{
  winston.info('Listening on port ' + port);
});
