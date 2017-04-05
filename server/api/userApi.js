let userApi = (app, mongoose, winston) => {
  let {User} = require('../models/user'),
       {authenticate} = require('../middleware/authenticate');

  // POST - sign up
  app.post('/api/users/signup', (req, res)=>{
    winston.info('POST users', req.body);

    let username = req.body.username;
    let password = req.body.password;

    var user = new User({username, password});
    winston.info('Sign up user', user);

    user.save().then(() => {
      winston.info('User saved');
      return user.generateAuthToken();
    }).then((token) => {
      res.send({
        token: token,
        userId: user._id
      });
    }).catch((e) => {
      errLogger(e)
       .then(() => {
        winston.info("Error signing up",  e);
        if (e.code == 11000) {
          res.status(409).send();
        } else {
          res.status(400).send();
        }
       })
       .catch(()=>{winston.info('Cannot write to log file');
      });
     });
  });

  // POST sign out
  app.post('/api/users/signout', authenticate, (req, res) => {
    winston.info('POST sign out');

    let token = req.headers['x-auth'];
    let userId = req.body.userid;
    winston.info(`UserId: ${userId}, Token: ${token}`);

    User.findByIdAndUpdate(userId,
          {$pull: {'tokens': {'token': token}}}, {new: true})
        .then((user) => {
          res.send({status: 'OK'})
        })
        .catch((err)=> {
          winston.info(err);
          res.status(500).send
        });
  });

  app.post('/api/users/signoutall', authenticate, (req, res) =>{
    winston.info('POST signoutall');

    let token = req.headers['x-auth'];
    let userId = req.body.userid;
    winston.info(`UserId: ${userId}, Token: ${token}`);

    User.findByIdAndUpdate(userId, {$unset: {tokens: ''}})
      .then((doc)=>{
        res.send({statsu: 'OK'})
      })
      .catch((err)=>{
        winston.info(err);
        res.status(500).send
      });
  });

  // POST - login
  app.post('/api/users/login', (req, res) => {
    winston.info('POST login', req.body);

    let username = req.body.username.trim();
    let password = req.body.password.trim();

    User.findByCredentials(username, password)
           .then((user) => {
             return user.generateAuthToken().then((token) => {
               res.send({
                 userId: user._id,
                 token: token
               });
             });
           })
           .catch((e) => {
             winston.error('Error returning token ', e);
             if (e.code === 11000) {
               res.status(401).send();
             } else {
               res.status(400).send();
             }
           });
  });
}

module.exports = {userApi}
