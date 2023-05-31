const todo = require("../model/Todo");

const createtodo = async (req, res) => {
  try {
    const { id, content } = req.body;
    const newtodo = await todo.create({ userId: id, content: content });
    if (newtodo) {
      res
        .status(200)
        .json({ message: "todo created successfully", data: newtodo });
    } else {
      res.status(404).json("todos is not created");
    }
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const findTodo = async (req, res) => {
  try {
    const {_id} = req.body;
    const findUserTodo = await todo.find({ userId: _id });
    if (findUserTodo) {
      res.status(200).json({ message: "Get all todo", data: findUserTodo });
    }
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const updateTodo = async (req, res) => {
  try {
    const { id, content,todoId} = req.body;
    const updateUserTodo = await todo.findOneAndUpdate(
      { userId:id,_id:todoId },
      { content: content }
    );
    
    if (updateUserTodo) {
      res
        .status(200)
        .json({ message: "Todo updated succesfully", data: updateUserTodo });
    }
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const deleteData = async (req, res) => {
  try {
    const { id } = req.body;
    const deleteDataUser = await todo.deleteOne({ _id:id });
    console.log(deleteDataUser)
    if (deleteDataUser) {
      res.status(200).json({
        message: "Data deleted successfully",
        data: deleteDataUser,
      });
    } else {
      throw new Error("Failed to delete");
    }
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = { createtodo, findTodo, updateTodo ,deleteData };
