var express = require('express');
var router = express.Router();
const blogController = require('../controller/blog')
const userController = require('../controller/user')
const multer  = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/blog')
    },
    filename: function (req, file, cb) {
        // console.log(file);
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix + file.originalname)
    }
  })
  
  const upload = multer({ storage: storage })
  

/* GET home page. */
router.post('/add', upload.array('images',5),blogController.ADDBLOG)

router.get('/all',userController.CHECKJWT,blogController.ALLBLOG)

router.patch('/edit/:id',upload.array('images',5),blogController.EDITBLOG)

router.delete('/delete/:id',blogController.DELETEBLOG)

router.get('/alldata',blogController.ALLDATA)

router.get('/search/:id',blogController.SEARCH)

router.get('/data',blogController.SEARCHBYNAME)

//page1
router.get('/page1',blogController.PAGE1)

//page2
router.get('/page2',blogController.PAGE2)


module.exports = router;