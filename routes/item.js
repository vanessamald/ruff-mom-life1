const { Router } = require('express');
const itemController = require('../controllers/itemControllers');
const router = Router();

const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

router.get('/items', itemController.get_items);
router.post('/items',itemController.post_item);
router.put('/items/:id',itemController.update_item);
router.delete('/items/:id',itemController.delete_item);

module.exports = router;