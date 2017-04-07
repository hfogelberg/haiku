let userApi = (app, mongoose) => {
  let {User} = require('../models/user'),
       {authenticate} = require('../middleware/authenticate');

  // POST - sign up
  app.post('users/signup', (req, res)=>{
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
    }).catch((e) => {
      errLogger(e)
       .then(() => {
        if (e.code == 11000) {
          res.status(409).send();
        } else {
          res.status(400).send();
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
          res.status(500).send(err);
        });
  });

  app.post('users/signoutall', authenticate, (req, res) =>{
    let token = req.headers['x-auth'];
    let userId = req.body.userid;

    User.findByIdAndUpdate(userId, {$unset: {tokens: ''}})
      .then((doc)=>{
        res.send({statsu: 'OK'})
      })
      .catch((err)=>{
        res.status(500).send
      });
  });

  // POST - login
  app.post('users/login', (req, res) => {
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
             if (e.code === 11000) {
               res.status(401).send();
             } else {
               res.status(400).send(e);
             }
           });
  });
}

module.exports = {userApi}
