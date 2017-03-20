let api = (app, mongoose) => {
  let {userApi} = require('./userApi');
  // let {fileApi} = require('./fileApi');

  userApi(app, mongoose);
  // fileApi(app, mongoose);

  app.get('/api', (req, res) => {
    res.send({'message': 'API is alive'});
  });
};

module.exports = {api};
