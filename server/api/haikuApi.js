let haikuApi = (app, mongoose, settings) => {
  var {Image} = require('../models/image'),
        {errLogger} = require('../utils/errLogger'),
        {authenticate} = require('../middleware/authenticate');

  // POST new image
  app.post('/api/haiku', authenticate, (req, res) => {
    console.log('POST haiku');
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
      console.log('Image saved');
      res.send({message: 'OK'});
    })
    .catch((err)=>{
      errLogger(e);
      res.status(500).send();
    });
  });
};

module.exports = {haikuApi}
