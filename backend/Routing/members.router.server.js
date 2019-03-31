const ProfileSchema = require("../Model/ProfileSchema.js");
const express = require("express");

const router = express.Router();

router.get("/getMembers", (req, res) => {
  ProfileSchema.find((err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});

module.exports = router;
