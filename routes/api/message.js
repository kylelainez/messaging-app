const express = require('express');
const router = express.Router();
const messagCtrl = require('../../controllers/message');
const multer = require('multer');
const upload = multer();

router.post('/photo', upload.single('photo'), messagCtrl.sendPhoto());

module.exports = router;
