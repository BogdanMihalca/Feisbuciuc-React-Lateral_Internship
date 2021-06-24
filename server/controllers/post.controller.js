const { cloudinary } = require("../config/cloudinary.config");
const db = require("../models");
const Post = db.posts;
const User = require("../models/user.model");
// Create and Save a new Post
exports.create = async (req, res) => {
  try {
    const body = req.body;
    if (!body) {
      return res.status(400).json({
        success: false,
        error: "You must provide a post",
      });
    }
    const { description, picture, user_id } = req.body;
    const currentUser = await User.findOne({ _id: user_id });
    const post = new Post({ description });

    if (picture) {
      console.log("got pic");
      const uploadedPic = await cloudinary.uploader.upload(picture, {
        folder: "feisbuciuc",
        allowed_formats: ["jpeg", "png", "jpg"],
      });

      post.post_image = {
        url: uploadedPic.url,
        public_id: uploadedPic.public_id,
      };
    }
    post.author = currentUser;
    if (!post) {
      return res.status(400).json({ success: false, error: err });
    }

    post
      .save()
      .then(() => {
        return res.status(201).json({
          success: true,
          id: post._id,
          message: "Post created!",
        });
      })
      .catch((error) => {
        return res.status(400).json({
          error,
          message: "An error occured while created an account",
        });
      });
  } catch (err) {
    console.log(err);
  }
};

// Retrieve all Posts from the database.
exports.findAll = async (req, res) => {
  await Post.find()
    .sort({ createdAt: -1 })
    .populate("author")
    .exec(function (err, posts) {
      if (err) {
        return res.status(400).json({ success: false, error: err });
      }
      if (!posts.length) {
        return res
          .status(404)
          .json({ success: false, error: `Posts not found` });
      }
      return res.status(200).json({ success: true, data: posts });
    });
};

// Find a single Post with an id
exports.findOne = async (req, res) => {
  await Post.findOne({ _id: req.params.id }, (err, post) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }

    if (!post) {
      return res.status(404).json({ success: false, error: `Post not found` });
    }
    return res.status(200).json({ success: true, data: post });
  }).catch((err) => console.log(err));
};

// Update a Post by the id in the request
exports.update = (req, res) => {};

// Delete a Post with the specified id in the request
exports.delete = async (req, res) => {
  await Post.findOneAndDelete({ _id: req.params.id }, (err, post) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }

    if (!post) {
      return res.status(404).json({ success: false, error: `Post not found` });
    }

    return res.status(200).json({ success: true, data: post });
  }).catch((err) => console.log(err));
};
// Delete all Posts from the database.
exports.deleteAll = (req, res) => {};
