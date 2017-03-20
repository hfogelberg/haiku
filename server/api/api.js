let api = (app, mongoose) => {
  let {userApi} = require('./userApi');

  userApi(app, mongoose);

  app.get('/api', (req, res) => {
    res.send({'message': 'API is alive'});
  });
};

module.exports = {api};
