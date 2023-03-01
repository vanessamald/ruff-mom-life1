const Item = require('../models/Item/Item');

const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

module.exports.get_item = (req, res) => {
    Item.findById({_id: req.params.id}, req.body).then(item => res.json(item));
}

module.exports.get_items = (req,res) => {
    Item.find().sort({date:-1}).then(items => res.json(items));
}

module.exports.get_category = (req, res) => {
    Item.find().sort({category}).then(items => res.json(items));
}

module.exports.post_item = (req,res) => {
    const newItem = new Item(req.body);
    newItem.save().then(item => res.json(item));
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