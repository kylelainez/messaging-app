const express = require('express');
const router = express.Router();
const conversationCtrl = require('../../controllers/conversation');

router.post('/', conversationCtrl.postConversation);

module.exports = router;
