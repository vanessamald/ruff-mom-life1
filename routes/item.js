const { Router } = require('express');
const itemController = require('../controllers/itemControllers');
const router = Router();

const mongoose = require('mongoose');
const multer = require("multer");
/*
const { App } = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
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
router.post("/addItem",upload.single('image'),(req,res)=>{
    var img = fs.readFileSync(req.file.path);
    var encode_img = img.toString('base64');
    var final_img = {
        contentType:req.file.mimetype,
        image:new Buffer(encode_img,'base64')
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


module.exports = router;