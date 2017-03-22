let fileApi = (app, mongoose, settings) => {
  var cloudinary = require('cloudinary'),
        fs = require('fs'),
        {errLogger} = require('../utils/errLogger'),
        {authenticate} = require('../middleware/authenticate');

  cloudinary.config({
    cloud_name: settings.CLOUDINARY_CLOUD_NAME,
    api_key: settings.CLOUDINARY_API_KEY,
    api_secret: settings.CLOUDINARY_API_SECRET
  });

  // POST new image
  app.post('/api/files', (req, res) => {
    console.log('POST file');
    console.log(config);
    console.log(req);
    var imageStream = fs.createReadStream(req.files.image.path, { encoding: 'binary' }),
      cloudStream = cloudinary.uploader.upload_stream(
        () => {
          res.redirect('/');
        });

    imageStream.on('data', cloudStream.write).on('end', cloudStream.end);
  })
};

module.exports = {fileApi}
