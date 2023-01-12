const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const config = require('config');

const fs = require('fs');
const bodyParser = require('body-parser');
const multer = require("multer");

const authRoutes = require('./routes/auth');
const itemRoutes = require('./routes/item');
const cartRoutes = require('./routes/cart');
const orderRoutes = require('./routes/order');

const app = express();
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

app.use('/api',authRoutes);
app.use('/api',itemRoutes);
app.use('/api',cartRoutes);
app.use('/api',orderRoutes);

if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
res.sendFile(path.resolve(__dirname,'client','build','index.html'));
    });
}

const dbURI = config.get('dbURI');
const port = process.env.PORT || 4000;
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => app.listen(port))
  .catch((err) => console.log(err));

// SET STORAGE
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'images')
    },
    filename: function (req, file, cb) {
        console.log(file);
      cb(null, file.fieldname + '-' + Date.now())
    }
  })
  var upload = multer({ storage: storage });

var imgModel = require('./models/Item/Item');
const { Console } = require('console');


app.get('/items', (req, res) => {
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



app.post('/items', upload.single('image'),(req, res, next) => {
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



/*
app.use(multer({ dest: './images',
 rename: function (fieldname, filename) {
   return filename;
 },
}));
*/

/*
app.post('/addItem', upload.single('image', async (req, res) => {
    try {
        if(!req.file) {
            res.json({
                success: false,
                message: 'You must provide an image'
            });
        } else {
            let imageUploadObject = {
                image: {
                    data: req.file.buffer,
                    contentType: req.file.mimetype
                }
               
            };
            const uploadObject = new
            upload(imageUploadObject);

            const uploadProcess = await uploadObject.save();
        }
        
    } catch(error) {
        console.log(error);
        res.status(500).send('Server Error')
    }
}));
*/




/*
app.post('/addItem',function(req,res){
    var newItem = new Item();
    newItem.image.data = fs.readFileSync(req.files.userPhoto.path)
    newItem.image.contentType = 'image/png';
    newItem.save();
   });
*/



/*
// testing post route
app.post("/items",upload.single('image'),(req,res)=>{
    console.log(req.file);

    var img = fs.readFileSync(req.file);
    console.log(img);
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
});
*/

/*
app.post("/items",upload.single('image'),(req,res)=>{
    console.log(req.body);
    var img = fs.readFileSync(req.file.path);


    console.log(req.file.path);
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