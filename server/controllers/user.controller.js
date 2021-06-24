const db = require("../models");
const User = db.users;

//get a single User by id
exports.getUserById = (req, res) => {
  await User.findOne({ _id: req.params.id }, (err, post) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }

    if (!post) {
      return res.status(404).json({ success: false, error: `User not found` });
    }
    return res.status(200).json({ success: true, data: post });
  }).catch((err) => console.log(err));
};

// Update a User by the id in the request
exports.update = (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must provide a body to update",
    });
  }

  User.findOne({ _id: req.params.id }, (err, user) => {
    if (err) {
      return res.status(404).json({
        err,
        message: "User not found!",
      });
    }
    user.name = body.name;
    movie
      .save()
      .then(() => {
        return res.status(200).json({
          success: true,
          id: movie._id,
          message: "Movie updated!",
        });
      })
      .catch((error) => {
        return res.status(404).json({
          error,
          message: "Movie not updated!",
        });
      });
  });
};
