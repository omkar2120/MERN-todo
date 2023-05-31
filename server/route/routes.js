const express = require("express");
const UserController = require("../controller/UserController.js");
const todoController = require("../controller/TodoController.js");
const router = express.Router();

router.post('/signin', UserController.signin)
router.post('/login', UserController.login)
router.post('/createTodo', todoController.createtodo) 
router.post('/findTodo', todoController.findTodo) 
router.post("/updateTodo", todoController.updateTodo)
router.post("/deleteData", todoController.deleteData)



module.exports = router;
