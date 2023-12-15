const express = require("express");
const router = express.Router();

router.get("/view_beverages", (req, res) => {
  res.render("menu/beverages");
});

router.get("/view_dining", (req, res) => {
  res.render("menu/dining");
});

router.get("/view_deserts", (req, res) => {
  res.render("menu/deserts");
});

module.exports = router;
