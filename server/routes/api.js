const express = require("express");
const router = express.Router();
const passport = require("passport");
const PostCtrl = require("../controllers/post.controller");

router.post("/register_login", (req, res, next) => {
  passport.authenticate("local", function (err, user, info) {
    if (err) {
      return res.status(400).json({ errors: err });
    }
    if (!user) {
      return res.status(400).json({ errors: "No user found" });
    }
    req.logIn(user, function (err) {
      if (err) {
        return res.status(400).json({ errors: err });
      }
      return res.status(200).json({ authenticatedUser: user });
    });
  })(req, res, next);
});

//the logedin Middleware
function loggedIn(req, res, next) {
  if (req.user) {
    next();
  } else {
    res.redirect("/");
  }
}
router.get("/logout", (req, re) => {
  req.logout();
  req.session = null;
});

//CRUD for the api
router.post("/post", PostCtrl.create);
router.delete("/post/:id", loggedIn, PostCtrl.delete);
router.get("/post/:id", loggedIn, PostCtrl.findOne);
router.get("/posts", PostCtrl.findAll);
module.exports = router;
