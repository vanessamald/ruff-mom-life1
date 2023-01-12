const { Router } = require('express');
const itemController = require('../controllers/itemControllers');
const router = Router();

const mongoose = require('mongoose');
const multer = require("multer");

// testing 

const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

/*
router.use(multer({ dest: './images',
rename: function (fieldname, filename) {
  return filename;
},
}));
*/

router.get('/items', itemController.get_items);
router.post('/items',itemController.post_item);
router.put('/items/:id',itemController.update_item);
router.delete('/items/:id',itemController.delete_item);

/*
//Schema
var imgSchema = mongoose.Schema({
    image:{data:Buffer,contentType: String}
});
var image = mongoose.model("image",imgSchema); 
*/

/*
// SET STORAGE
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'images')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    }
  })
  var upload = multer({ storage: storage })
  var imgModel = require('../models/Item/Item');
*/


/*
router.get('/addItem', (req, res) => {
    imgModel.find({}, (err, items) => {
        if (err) {
            console.log(err);
            res.status(500).send('An error has occurred', err);
        }
        else {
            res.render('imagesPage', { items: items });
        }
    }
        )
})
*/

/*
router.get('/addItem', 
    imgModel.single('file'), async (req, res) => {
        try {
            if (!req.file) {
                res.json({
                    success: false,
                    message: 'You must provide an image'
                });
            } else {
                let imageUploadObject = {
                    file: {
                        data: req.file.buffer,
                        contentType: req.file.mimetype
                    },
                    filename: req.body.fileName
                };
                const uploadObject = new upload(imageUploadObject);
                const uploadProcess = await uploadObject.save();
            }
        } catch (error) {
            console.error(error);
            res.status(500).send('Server Error')
        }
    })
*/

/*
router.post("/",upload.single('image'),(req,res)=>{
    var img = fs.readFileSync(req.file.path);
    var encode_img = img.toString('base64');
    var final_img = {
        contentType:req.file.mimetype,
        image:new Buffer.from(encode_img,'base64')
    };
    image.create(final_img,function(err,result){
        if(err){
            console.log(err);
        }else{
            console.log(result.img.Buffer);
            console.log("Saved To database");
            res.contentType(final_img.contentType);
            res.send(final_img.image);
        }
    })
})
*/

/*
router.post('/', upload.single('image'),(req, res, next) => {
    console.log(req.file);
    console.log(req.body);
    var obj = {
        name: req.body.name,
        img: {
            data: fs.readFileSync(path.join(__dirname + 'images' + req.file.filename)),
            contentType: 'image/jpg'
        }
    }
    imgModel.create(obj, (err, item) => {
    console.log(obj); 

        if (err) {
            console.log('An error occurred', err);
        }
        else {
            item.save();
            res.redirect('/');
        }
    });
    
});
*/


module.exports = router;