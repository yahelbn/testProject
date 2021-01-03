const express = require("express");
const router = express.Router();

router.post("/create", (req, res) => {
  /**
   * create new user in db
   */
  try {
    createFindoc(req.body);
    res.status(200);
  } catch (e) {
    res.status(400);
  }
});

router.post("/login", (req, res) => {
  /**
   * authenticate by username and password
   */
  try {
    res.status(200);
  } catch (e) {
    res.status(400);
  }
});

module.exports = router;
