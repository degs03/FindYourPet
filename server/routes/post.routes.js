const express = require('express');
const router = express.Router();

const postController = require('../controllers/post.controller')

//Create
router.post("", postController.createPost);
//Find All
router.get("", postController.findAllPosts);
//Find One
router.get("/:id", postController.findPost);
//Update One
router.put("/:id", postController.updatePost);
//Delete One
router.delete("/:id", postController.deletePost);


module.exports = router;