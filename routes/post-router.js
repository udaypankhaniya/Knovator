const express = require("express");
const router = express.Router();
const postsController = require("../controllers/post/post-controller.js");
const postsValidator = require("../controllers/post/post-validator.js");
const { validate } = require("../helper/index.js")

const { configurePassportMiddleware } = require("../middleware/index.js")

router.use(configurePassportMiddleware)
router.post("/createPost", validate(postsValidator.createPostSchema), postsController.createPost);
router.get("/postList", postsController.postsList);

router.get('/:id', postsController.postDetails)
router.put('/:id', validate(postsValidator.createPostSchema), postsController.updatePost)
router.delete('/:id', postsController.deletePost)



module.exports = router;