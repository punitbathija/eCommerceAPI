const express = require("express");
const router = express.Router();

const { home } = require("../controllers/homeController");
const { homeDummy } = require("../controllers/homeController");

router.route("/").get(home);
router.route("/dummy").get(homeDummy);

module.exports = router;
