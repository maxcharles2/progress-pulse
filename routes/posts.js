const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const postsController = require("../controllers/posts");
const commentsController = require("../controllers/comments");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Post Routes - simplified for now
// router.get("/:id", ensureAuth, postsController.getPost);

router.get("/:id", ensureAuth, commentsController.getPost);

router.post("/createPost", upload.single("file"), postsController.createPost);

router.post("/createComment", upload.single("file"), commentsController.createComment);

router.put("/likePost/:id", postsController.likePost);

router.put("/:id/editExercise/:index", postsController.updateExercise);

router.put("/:id/addExercise", postsController.addExercise);

router.delete("/deletePost/:id", postsController.deletePost);

router.delete("/:id/deleteExercise/:index", postsController.deleteExercise);


module.exports = router;
