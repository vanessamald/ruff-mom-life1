const Item = require('../models/Item/Item');

const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

module.exports.get_items = (req,res) => {
    Item.find().sort({date:-1}).then(items => res.json(items));
}

module.exports.post_item = (req,res) => {
    const newItem = new Item(req.body);
    //console.log(newItem);
    //console.log(req.file);
    newItem.save().then(item => res.json(item));

    /*
    // testing
    console.log(req.file);
    var img = fs.readFileSync(req.file);
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
    */
}

module.exports.update_item = (req,res) => {
    Item.findByIdAndUpdate({_id: req.params.id},req.body).then(function(item){
        Item.findOne({_id: req.params.id}).then(function(item){
            res.json(item);
        });
    });
}

module.exports.delete_item = (req,res) => {
    Item.findByIdAndDelete({_id: req.params.id}).then(function(item){
        res.json({success: true});
    });
}