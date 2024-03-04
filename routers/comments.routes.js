const router = require("express").Router();
const { auth } = require("../middleware/auth.middleware");
const commentsController = require('../controller/comments.controller')


router.post("/addComment",auth(),commentsController.addComment);

module.exports = router;