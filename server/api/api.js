let api = (app, mongoose, cloudinary, settings) => {
  let {userApi} = require('./userApi');
  let {fileApi} = require('./fileApi');

  userApi(app, mongoose);
  fileApi(app, mongoose, settings);

  app.get('/api', (req, res) => {
    res.send({'message': 'API is alive'});
  });
};

module.exports = {api};
