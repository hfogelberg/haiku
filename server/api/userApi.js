let userApi = (app, mongoose) => {
  let {User} = require('../models/user'),
       {authenticate} = require('../middleware/authenticate');

  // POST - sign up
  app.post('/api/users/signup', (req, res)=>{
    let username = req.body.username;
    let password = req.body.password;

    var user = new User({username, password});
    user.save().then(() => {
      return user.generateAuthToken();
    }).then((token) => {
      res.send({
        token: token,
        userId: user._id
      });
    }).catch((err) => {
        console.log('POST signup user error', err);
       .then(() => {
        if (err.code == 11000) {
          res.status(409).send(err);
        } else {
          res.status(400).send(err);
        }
       });
     });
  });

  // POST sign out
  app.post('/api/users/signout', authenticate, (req, res) => {
    let token = req.headers['x-auth'];
    let userId = req.body.userid;

    User.findByIdAndUpdate(userId,
          {$pull: {'tokens': {'token': token}}}, {new: true})
        .then((user) => {
          res.send({status: 'OK'})
        })
        .catch((err)=> {
          console.log('POST sign out user err', err);
          res.status(500).send(err);
        });
  });

  // POST - sign out all
  app.post( '/api/users/signoutall', authenticate, (req, res) =>{
    let token = req.headers['x-auth'];
    let userId = req.body.userid;

    User.findByIdAndUpdate(userId, {$unset: {tokens: ''}})
      .then((doc)=>{
        res.send({statsu: 'OK'})
      })
      .catch((err)=>{
        console.log('POST sign out all err', err);
        res.status(500).send(err);
      });
  });

  // POST - login
  app.post('/api/users/login', (req, res) => {
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
           .catch((err) => {
             console.log('POST login err', err);
             if (err.code === 11000) {
               res.status(401).send(err);
             } else {
               res.status(400).send(err);
             }
           });
  });
}

module.exports = {userApi}
