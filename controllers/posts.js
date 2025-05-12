const cloudinary = require("../middleware/cloudinary");
const User = require("../models/User");
const Post = require("../models/Post");

module.exports = {
  getProfile: async (req, res) => {
    try {
      // Fetch the user from DB and populate their therapist if applicable
      const user = await User.findById(req.user.id).populate("therapist").lean();
      // Get posts belonging to that user (physical therapist)

      //Empty lists until role is assigned
      let posts = [];
      let patients = [];

      //If user is a physical therapist get their associated patients as an array and reassigned to empty patients/posts array to the result of the DB query
      if (user.role === "Physical Therapist") {
        // Get posts created by this PT
        posts = await Post.find({ user: req.user.id }).populate("patient").lean();

        // Get all patients assigned to this PT
        patients = await User.find({ therapist: user._id, role: "Patient" }).lean()
      } else if (user.role === "Patient") {
        // Only show posts assigned to this patient
        posts = await Post.find({ patient: req.user.id }).populate("user").lean();
      }

      res.render("profile.ejs", { 
        posts: posts, //physical therapist's posts
        user: user, // now includes therapist populated if user is a patient
        patients: patients //Pass patients array to the profile.ejs file in views folder
      });
    } catch (err) {
      console.log(err);
    }
  },
  getFeed: async (req, res) => {
    try {
      //what creates an array for the EJS to loop
      // console.log(posts, "this is an array of posts");
      //populate("patient") replaces the id of the patient and puts the entire user document (possible with ref: "User") of the patient of a specific id
      
      // Only allow access if user is a physical therapist
      if (req.user.role !== "Physical Therapist") {
        return res.status(403).send("Access denied");
      }

      // Get the patients assigned to this therapist
      const patients = await User.find({ therapist: req.user.id }, '_id').lean();
      const patientIds = patients.map(p => p._id);

      // Get posts created for those patients
      const posts = await Post.find({ patient: { $in: patientIds } }).populate("patient").sort({ createdAt: "desc" }).lean();
      res.render("feed.ejs", { posts: posts });
    } catch (err) {
      console.log(err);
    }
  },
  getPost: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      const comments = await Comment.find({ post: req.params.id }).lean();
      console.log(post.exercises);
      res.render("post.ejs", { post: post, user: req.user, comments: comments });
    } catch (err) {
      console.log(err);
    }
  },
  createPost: async (req, res) => {
    try {
      // Upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);

      await Post.create({
        title: req.body.title,
        image: result.secure_url,
        cloudinaryId: result.public_id,
        caption: req.body.caption,
        likes: 0,
        user: req.user.id, //physical therapist's id
        patient: req.body.patient, // selected patient's id
        exercises: req.body.exercises
      });
      console.log("Post has been added!");
      res.redirect("/profile");
    } catch (err) {
      console.log(err);
    }
  },
  likePost: async (req, res) => {
    try {
      await Post.findOneAndUpdate(
        { _id: req.params.id },
        {
          $inc: { likes: 1 },
        }
      );
      console.log("Likes +1");
      res.redirect(`/post/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },
  updateExercise: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      //updated exercise value from the form submit to edit the rehab plan
      const updatedExercise = {
        day: req.body.day,
        name: req.body.name,
        sets: Number(req.body.sets),
        reps: Number(req.body.reps)
      };

      //update the specific exercise at a given index
      post.exercises[req.params.index] = updatedExercise;

      await post.save()

      res.redirect(`/post/${req.params.id}`)
    } catch (err) {
      console.log(err);
      res.status(500).send("Error updating exercise");
    }
  },
  deleteExercise: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id)

      post.exercises.splice(req.params.index, 1);

      await post.save();

      res.redirect(`/post/${req.params.id}`);
    } catch (err) {
      console.log(err)
      res.status.send("Error deleting exercise")
    }
  },
  deletePost: async (req, res) => {
    try {
      // Find post by id
      let post = await Post.findById({ _id: req.params.id });
      // Delete image from cloudinary
      await cloudinary.uploader.destroy(post.cloudinaryId);
      // Delete post from db
      await Post.remove({ _id: req.params.id });
      console.log("Deleted Post");
      res.redirect("/profile");
    } catch (err) {
      res.redirect("/profile");
    }
  },
};
