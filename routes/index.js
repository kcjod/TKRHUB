var express = require('express');
var router = express.Router();
const userModel = require('./users');
const postModel = require('./posts');
const localStrategy = require("passport-local");
const passport = require("passport");

passport.use(new localStrategy(userModel.authenticate()));

// GET routes

router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/signup', function(req, res, next) {
  res.render('signup', {err: req.flash('error')});
});

router.get('/login', function(req, res, next) {
  res.render('login',{ err: req.flash("error")});
});

router.get('/profile', isLoggedIn, async function(req, res, next) {
  const user = await userModel.findOne({username: req.session.passport.user});
  res.render('profile', {user: user});
});

router.get("/feed", isLoggedIn, async function(req, res, next) {
  try {
    // Retrieve all posts and populate the 'author' field with user details
    const posts = await postModel.find().populate("author");
    const user = await userModel.findOne({username: req.session.passport.user});

    // Render the 'feed' template with the retrieved posts
    res.render("feed", { posts: posts, user:user });
  } catch (error) {
    next(error);
  }
});


// router.get("/posts",async function(req,res){
//   const posts = await postModel.find();
//   res.send(posts);
// })


// POST routes

router.post("/post", isLoggedIn, async function(req, res, next) {
  try {
    const user = await userModel.findOne({
      username: req.session.passport.user
    });

    console.log("User:", user); // Log user object

    const post = new postModel({
      content: req.body.content,
      author: user._id
    });

    console.log("Post:", post); // Log post object
    await post.save();

    user.posts.push(post._id);
    await user.save();
    console.log("User after saving:", user); // Log user object after saving

    res.redirect("/feed");
  } catch (error) {
    console.error("Error creating post:", error); // Log any errors
    next(error);
  }
});


router.post("/follow/:username", function(){

})

router.post("/register", function (req, res) {
  userModel.findOne({ username: req.body.username })
    .then(existingUser => {
      if (existingUser) {
        // Username already exists, send flash message
        req.flash("error", "Username already exists.");
        return res.redirect("/signup"); // Redirect to the home page
      }

      const user = new userModel({
        username: req.body.username,
        email: req.body.email,
      });

      userModel.register(user, req.body.password)
        .then(() => {
          passport.authenticate("local")(req, res, function () {
            res.redirect("/profile");
          });
        })
        .catch(error => {
          console.error(error);
          req.flash("error", "Error creating user.");
          res.redirect("/signup");
        });
    })
    .catch(error => {
      console.error(error);
      req.flash("error", "Error checking existing user.");
      res.redirect("/signup");
    });
});



router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/feed",
    failureRedirect: "/login",
    failureFlash: true,
  }),
  function (req, res) {}
);

router.get("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/login");
  });
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/login");
}

module.exports = router;
