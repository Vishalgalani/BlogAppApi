var express = require('express');
var router = express.Router();
const categoryController = require('../controller/control')
const multer  = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/category')
    },
    filename: function (req, file, cb) {
        // console.log(file);
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix + file.originalname)
    }
  })
  
  const upload = multer({ storage: storage })
  

/* GET home page. */
router.post('/add', upload.single('image'),categoryController.ADDCATEGORY)

router.get('/all',categoryController.ALLCATEGORY)

router.patch('/edit/:id',upload.single('image'),categoryController.EDITCATEGORY)

router.delete('/delete/:id',categoryController.DELETECATEGORY)

module.exports = router;
