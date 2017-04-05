let haikuApi = (app, mongoose, settings, winston) => {
  var {Image} = require('../models/image'),
        cors = require('cors'),
        {errLogger} = require('../utils/errLogger'),
        {authenticate} = require('../middleware/authenticate');

  // GET images
  app.get('/api/haiku', (req, res)=>{
    winston.info('GET haiku');
    Image.find({display: true}).sort({isPriority: 1, created: 1})
      .then((images)=>{
        res.send({message: 'OK', images: images})
      })
      .catch((err)=>{
        winston.error('Error finding images', err);
        res.status(404).send(e);
      });
  })

  // POST new image
  app.post('/api/haiku', authenticate, (req, res) => {
    winston.info('POST haiku');
    winston.info('Header', req.header);

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
      winston.info('Image saved');
      res.send({message: 'OK'});
    })
    .catch((err)=>{
      winston.error(e);
      res.status(500).send();
    });
  });
};

module.exports = {haikuApi}
