let userApi = (app, mongoose) => {
  let {User} = require('../models/user'),
        {errLogger} = require('../utils/errLogger'),
        {authenticate} = require('../middleware/authenticate');

  // POST - sign up
  app.post('/api/users', (req, res)=>{
    console.log('POST users', req.body);

    let username = req.body.username;
    let password = req.body.password;

    var user = new User({username, password});
    console.log('User', user);

    user.save().then(() => {
      console.log('User saved');
      return user.generateAuthToken();
    }).then((token) => {
      res.send({
        token: token,
        userId: user._id
      });
    }).catch((e) => {
      errLogger(e)
       .then(() => {
        console.log("Error signing up",  e);
        if (e.code == 11000) {
          res.status(409).send();
        } else {
          res.status(400).send();
        }
       })
       .catch(()=>{console.log('Cannot write to log file');
      });
     });
  });

  // POST sign out
  app.post('/api/users/signout', authenticate, (req, res) => {
    console.log('POST sign out');

    let token = req.headers['x-auth'];
    let userId = req.body.userid;
    console.log(`UserId: ${userId}, Token: ${token}`);

    User.findByIdAndUpdate(userId,
          {$pull: {'tokens': {'token': token}}}, {new: true})
        .then((user) => {
          res.send({status: 'OK'})
        })
        .catch((err)=> {
          console.log(err);
          res.status(500).send
        });
  });

  app.post('/api/users/signoutall', authenticate, (req, res) =>{
    console.log('POST signoutall');

    let token = req.headers['x-auth'];
    let userId = req.body.userid;
    console.log(`UserId: ${userId}, Token: ${token}`);

    User.findByIdAndUpdate(userId, {$unset: {tokens: ''}})
      .then((doc)=>{
        res.send({statsu: 'OK'})
      })
      .catch((err)=>{
        console.log(err);
        res.status(500).send
      });
  });

  // POST - login
  app.post('/api/users/login', (req, res) => {
    console.log('POST login', req.body);

    let email = req.body.email.trim();
    let password = req.body.password.trim();

    User.findByCredentials(email, password)
           .then((user) => {
             return user.generateAuthToken().then((token) => {
               res.send({
                 userId: user._id,
                 token: token
               });
             });
           })
           .catch((e) => {
             console.log('Error returning token ', e);
             if (e.code === 11000) {
               res.status(401).send();
             } else {
               res.status(400).send();
             }
           });
  });

  // GET me. Authenticated route
  app.get('/api/me', authenticate, (req, res) =>{
    res.send({'message': 'Authenticated'});
  });
}

module.exports = {userApi}