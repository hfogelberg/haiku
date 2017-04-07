let haikuApi = (app, mongoose) => {
  var {Image} = require('../models/image'),
        cors = require('cors'),
        {errLogger} = require('../utils/errLogger'),
        {authenticate} = require('../middleware/authenticate');

  // GET images
  app.get('/api/haiku', (req, res)=>{
    Image.find({display: true}).sort({isPriority: 1, created: 1})
      .then((images)=>{
        res.send({message: 'OK', images: images})
      })
      .catch((err)=>{
        res.status(404).send(err);
      });
  })

  // POST new image
  app.post('/api/haiku', authenticate, (req, res) => {
    let title = req.body.title;
    let imagePath = req.body.imagePath;
    let haiku = req.body.haiku;
    let comment = req.body.comment;
    let isPriority = req.body.isPriority;
    let display = req.body.display;
    let created = req.body.created

    var image = new Image({
      title,
      imagePath,
      haiku,
      comment,
      isPriority,
      display,
      created
    });

    image.save().then((image)=>{
      res.send({message: 'OK'});
    })
    .catch((err)=>{
      res.status(500).send();
    });
  });
};

module.exports = {haikuApi}
