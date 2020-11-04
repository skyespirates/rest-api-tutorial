const express = require("express");
const Posts = require("../../models/Posts");
const router = express.Router();

const Todos = require("../../models/Todos");

//  GET all posts
router.get("/", async (req, res) => {
  try {
    const todos = await Todos.find();
    if (!todos) throw Error("There is no item here");
    res.status(200).json(todos);
  } catch (error) {
    res.status(400).json({ msg: error });
  }
});

//  GET a post with given ID
router.get("/:id", async (req, res) => {
  try {
    const todo = await Todos.findById(req.params.id);
    if (!todo) throw Error("there is no todo with given ID");
    res.status(200).json(todo);
  } catch (error) {
    res.status(400).json({ msg: error });
  }
});

//  POST a post
router.post("/", async (req, res) => {
  const newTodo = new Todos(req.body);
  try {
    const todo = await newTodo.save();
    if (!todo) throw Error("Something went wrong when posting a todo");
    res.status(200).json(todo);
  } catch (error) {
    res.status(400).json({ msg: error });
  }
});

//  Delete a post by the given ID
router.delete("/:id", async (req, res) => {
  try {
    const todo = await Todos.findByIdAndDelete(req.params.id);
    if (!todo) throw Error("There is no item by given ID to delete");
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(400).json({ msg: error });
  }
});

//  PATCH/UPDATE a post by the given ID
router.patch("/:id", async (req, res) => {
  try {
    const todo = await Todos.findByIdAndUpdate(req.params.id, req.body);
    if (!todo) throw Error("something went wrong when updating todo");
    res.status(200).json({ succes: true });
  } catch (error) {
    res.status(400).json({ msg: error });
  }
});

module.exports = router;
