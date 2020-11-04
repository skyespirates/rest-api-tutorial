const express = require("express");
const router = express.Router();

//   Models
const Posts = require("../../models/Posts");

//  GET all posts
router.get("/", async (req, res) => {
  try {
    const posts = await Posts.find();
    if (!posts) throw Error("There is no item");
    res.status(200).json(posts);
  } catch (err) {
    res.status(400).json({ msg: err });
  }
});

//  GET a post with given ID
router.get("/:id", async (req, res) => {
  try {
    const post = await Posts.findById(req.params.id);
    if (!post) throw Error("There is no item");
    res.status(200).json(post);
  } catch (err) {
    res.status(400).json({ msg: err });
  }
});

//  POST a post
router.post("/", async (req, res) => {
  const newPost = new Posts(req.body);
  try {
    const post = await newPost.save();
    if (!post) throw Error("there is no single post with given ID");
    res.status(200).json(post);
  } catch (err) {
    res.status(400).json({ msg: err });
  }
});

//  DELETE a post
router.delete("/:id", async (req, res) => {
  try {
    const posts = await Posts.findByIdAndDelete(req.params.id);
    if (!posts) throw Error("There is no item");
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(400).json({ msg: err });
  }
});

//  UPDATE a post
router.patch("/:id", async (req, res) => {
  try {
    const post = await Posts.findByIdAndUpdate(req.params.id, req.body);
    if (!post) throw Error("Something went wrong went updating the post");
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(400).json({ msg: err });
  }
});

module.exports = router;
