let api = (app, mongoose, cloudinary, settings) => {
  let {userApi} = require('./userApi');
  let {haikuApi} = require('./haikuApi');

  userApi(app, mongoose);
  haikuApi(app, mongoose, settings);

  app.get('/api', (req, res) => {
    res.send({'message': 'API is alive'});
  });
};

module.exports = {api};
