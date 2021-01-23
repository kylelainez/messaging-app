const express = require('express');
const router = express.Router();
const messageCtrl = require('../../controllers/message');
const multer = require('multer');
const upload = multer();

router.post('/', messageCtrl.sendMessage);
router.post('/photo', upload.single('photo'), messageCtrl.sendPhoto);
router.get('/:id', messageCtrl.getMessages);

module.exports = router;
