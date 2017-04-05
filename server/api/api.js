let api = (app, mongoose, cloudinary, winston) => {
  let {userApi} = require('./userApi');
  let {haikuApi} = require('./haikuApi');

  userApi(app, mongoose, winston);
  haikuApi(app, mongoose, winston);

  app.get('/api', (req, res) => {
    res.send({'message': 'API is alive'});
  });
};

module.exports = {api};
