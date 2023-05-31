const user = require("../model/User.js");
const todos = require("../model/Todo.js");

const signin = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const isExist = await user.findOne({ email: email });

    if (isExist) {
      return res
        .status(200)
        .send({ message: "User Already Exist. Please Login" });
    }
    const createUser = await user.create({
      username,
      email,
      password,
    });
    if (createUser) {
      return res
        .status(200)
        .send({ message: "User created successfully", data: createUser });
    } else {
      return res
        .status(400)
        .send({ message: "Failed to create user", data: [] });
    }
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userLogin = await user.findOne({ email });

    if (userLogin.email === email && userLogin.password === password) {
      res.status(200).send({
        message: "Login successful",
        data: userLogin,
      });
    } else {
      res.status(400).send({
        message: "Failed to login",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};


// const createTodo = async (req, res) => {
//   try {
//     const { id, content } = req.body;
//     // const createNewFile = new user.TaskSchema({
//     //   id: id,
//     //   task: task,
//     // });
//     // await createNewFile.save();
//     const newtodo = await todos.
//     if (createNewFile) {
//       res.status(200).json({
//         message: "Data stored successfully",
//         data: createNewFile,
//       });
//     } else {
//       throw new Error("Failed to add task");
//     }
//   } catch (err) {
//     res.status(500).json({
//       message: err.message,
//     });
//   }
// };

const deleteData = async (req, res) => {
  try {
    const { id } = req.body;
    const deleteData = await user.UserSchema.deleteOne({ _id: id });
    if (deleteData) {
      res.status(200).json({
        message: "Data deleted successfully",
        data: deleteData,
      });
    } else {
      throw new Error("User not created");
    }
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = { signin, login, deleteData };
