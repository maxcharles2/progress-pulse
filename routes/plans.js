const express = require("express");
const router = express.Router();
const plansController = require("../controllers/plans");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Comment Routes - simplified for now

// router.post("/createPost", upload.single("file"), postsController.createPost);

router.post("/addRehabExercise/", plansController.createComment);

// router.put("/likeComment/:id", plansController.likeComment);

// router.delete("/deleteComment/:id", plansController.deleteComment);

module.exports = router;
