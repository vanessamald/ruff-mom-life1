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

// set storage for images
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'client/public/images')
    },
    filename: function (req, file, cb) {
        console.log(file);
      cb(null, file.originalname)
    }
  })
var upload = multer({ storage: storage });

// schema for products
var itemSchema = require('./models/Item/Item');

app.post('/addItem', upload.single('image'),(req, res, next) => {
    console.log(req.body);
    console.log(req.file);
    console.log('File uploaded!');
    
    var newItem = {
        title: req.body.title,
        description: req.body.description,
        category: req.body.category,
        price: req.body.price,
        inventory: req.body.inventory,
        image: req.file.filename
        /*
        image: {
            data: fs.readFileSync(path.join(__dirname + '/client/public/images/'+ req.file.originalname )),
            contentType: 'image/jpg'
        }
        */
    }
    // add to db
    itemSchema.create(newItem, (err, item) => {
    console.log(newItem); 

        if (err) {
            console.log('An error occurred', err);
        }
        else {
            item.save();
            res.redirect('/addItem');
        }
    });
});