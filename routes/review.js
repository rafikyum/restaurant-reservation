const express = require("express");
const { db, findById } = require("../models/model");
const Model = require("../models/reviewModel");
const router = express.Router();
const { isLoggedIn } = require("../middleware");
const { Passport } = require("passport");
const passport = require("passport");
const user = require("../models/user");

app = express();

//setting view engine to ejs
app.set("view engine", "ejs");

router.get("/create", isLoggedIn, (req, res) => {
  res.render("reviews/create");
});

router.get("/update", isLoggedIn, (req, res) => {
  res.render("reviews/update");
});

router.post("/create", isLoggedIn, async (req, res) => {
  const review = new Model({
    forename: req.body.forename,
    surname: req.body.surname,
    review: req.body.review,
    rating: req.body.rating,
    username: req.session.passport.user,
  });

  try {
    const result = await review.save();
    req.flash("success", "review added");
    res.status(302);
    res.setHeader("Location", "/reviews");
    return res.end();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Index
router.get("/", isLoggedIn, async (req, res) => {
  try {
    const reviews = await Model.find();
    res.render("reviews/index", {
      reviews,
      currentUser: req.session.passport.user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/update/:id", isLoggedIn, async (req, res) => {
  try {
    const id = req.params.id;
    const updatedReservation = req.body;
    const options = { new: true };

    const result = await Model.findByIdAndUpdate(
      id,
      updatedReservation,
      options
    );
    req.flash("success", "review updated");
    res.statusCode = 302;
    res.setHeader("Location", "/reviews");
    return res.end();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Delete by ID Method
router.delete("/delete/:id", isLoggedIn, async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Model.findByIdAndDelete(id);
    req.flash("success", "review deleted");
    res.status(302);
    res.setHeader("Location", "/reviews");
    return res.end();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
