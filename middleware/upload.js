const path   = require('path')
const multer = require('multer')

var storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null, 'uploads/')
    },
    filename: function(req,file,cb){
        let ext = path.extname(file.originalname)
        cb(null,Date.now() + ext)
    }
})

const validation =  ["image/jpeg", "image/png", "image/jpg"];

/*function fileFilter(req, file, cb) {
    if (validation.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb("invalid image format", false);
      return cb(new Error("Only image format allowed!"));
    }
  }*/

var upload = multer ({
  storage: storage,
  //fileFilter: fileFilter
})
module.exports= upload