const multer = require('multer');
const path = require('path');
const {ResponseError} = require("../error/response.error");

const storage = multer.diskStorage({
   destination: function (req, file, cb) {
      cb(null, './public/images')
   },
   filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
   }
});

const fileFilter = (req, file, cb) => {
   if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
      cb(null, true);
   } else {
      cb(null, new ResponseError(400, false, 'Invalid file type'), false);
   }
}

const upload = multer({
   storage: storage,
   fileFilter: fileFilter,
    limits: {
        fileSize: 1024 * 1024 * 5
    }
})

module.exports = {
    upload
}