let api = (app, mongoose, cloudinary) => {
  let {userApi} = require('./userApi');
  let {haikuApi} = require('./haikuApi');

  userApi(app, mongoose);
  haikuApi(app, mongoose);

  app.get('http://haiku.golizzard.com/api/', (req, res) => {
    res.send({'message': 'API is alive'});
  });
};

module.exports = {api};
