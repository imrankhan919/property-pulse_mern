const express = require("express");
const {
  getMessages,
  sendMessage,
  removeMessage,
} = require("../controllers/messageController");

const router = express.Router();

router.get("/:uid", getMessages);
router.post("/:uid", sendMessage);
router.delete("/:uid", removeMessage);

module.exports = router;
