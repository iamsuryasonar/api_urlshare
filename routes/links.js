const router = require("express").Router();
const { verify } = require("../middleware/verifyToken");
const User = require("../model/User");
const { linkValidation } = require("../middleware/authValidation");
const Link = require("../model/Link");
const mongoose = require("mongoose");

// add link
router.post("/", verify, async (req, res) => {
  try {
    const link = new Link({
      url: req.body.url,
      title: req.body.title,
      description: req.body.description,
    });
    link.author = req.user._id;
    const savedlink = await link.save();

    const user = await User.findById({ _id: link.author });
    user.links.push(savedlink._id);
    const saveduser = await user.save();
    res.status(200).json({ success: true, data: saveduser });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// retrieve links
router.get("/", verify, async (req, res) => {
  try {
    const user = await User.findById({ _id: req.user._id }).populate("links");
    res.status(200).json({ success: true, data: user.links[0] });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// Update link
router.put("/:linkid", verify, async (req, res) => {
  try {
    const doc = await Link.find({
      _id: req.params.linkid,
    });
    if (doc[0] == undefined) {
      res.status(404).send("record not found");
    } else {
      if (doc[0].author._id.toString() === req.user._id) {
        doc[0].url = req.body.url;
        doc[0].title = req.body.title;
        doc[0].description = req.body.description;

        const data = await doc[0].save();
        res.status(200).json({ success: true, data: data });
      }
    }
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// delete link
router.delete("/:linkid", verify, async (req, res) => {
  try {
    const child = await Link.find({
      _id: req.params.linkid,
      author: req.user._id,
    });

    if (child[0] == undefined) {
      res.status(404).send("record not found");
    } else {
      if (child[0].author._id.toString() === req.user._id) {
        child[0].remove();
        res.status(200).json({ success: true, data: child });
      } else {
        res.status(400);
      }
    }
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});
module.exports = router;
