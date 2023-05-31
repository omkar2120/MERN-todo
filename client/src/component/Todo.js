import { Typography, TextField, Button, Select } from "@mui/material";
import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Box from "@mui/material/Box";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Todo = () => {
  const navigate = useNavigate();

  const [input, setInput] = useState("");
  const [allInput, setAllInput] = useState([]);
  const [local, setLocal] = useState();
  const [todo, setTodos] = useState([]);
  const [updateTodo, setUpdateTodo] = useState();
  const [isEdit, setIsEdit] = useState({ _id: "", status: false });
  // const [update, setUpdate] = useState();

  useEffect(() => {
    let localData = JSON.parse(localStorage.getItem("userInfo"));
    console.log(localData.data.data);
    setLocal(localData.data.data);
    getTodoData();
  }, []);

  const handleAdd = () => {
    try {
      const payload = {
        id: local._id,
        content: input,
      };
      const url = "http://localhost:3001/createTodo";
      const request = axios.post(url, payload);
      getTodoData();
      setInput("");
      if (request) {
        Swal.alert(request);
      }
      setIsEdit({ status: false, _id: "" });
    } catch (err) {}
  };
  const getTodoData = async () => {
    try {
      let localData = JSON.parse(localStorage.getItem("userInfo"));

      const payload = {
        _id: localData.data.data._id,
      };

      const getAllTodos = await axios.post(
        "http://localhost:3001/findTodo",
        payload
      );
      console.log("getAlllldata", getAllTodos.data.data);
      setTodos(getAllTodos.data.data);
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const handleEdit = () => {
    try {
      let localData = JSON.parse(localStorage.getItem("userInfo"));
      const payload = {
        id: localData.data.data._id,
        content: input,
        todoId: isEdit._id,
      };
      const url = "http://localhost:3001/updateTodo";
      const request = axios.post(url, payload);
      getTodoData();
      setInput("");
      setIsEdit({ status: false, _id: "" });
      if (request) {
        Swal.alert(request);
      }
    } catch (err) {}
  };

  const handleDelete = async (_id) => {
    try {
      const payload = {
        id: _id,
      };
      const deleteTodo = await axios.post(
        "http://localhost:3001/deleteData",
        payload
      );
      if (deleteTodo) {
        Swal.fire("Deleted Successfully", <h1></h1>);
        getTodoData();
      }
    } catch (err) {}
  };

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" style={{ backgroundColor: "white" }}>
          <Toolbar>
            <Typography
              variant="h6"
              color="black"
              component="div"
              sx={{ flexGrow: 1 }}
            >
              Todo
            </Typography>

            <Button>{local?.username}</Button>
            <Button onClick={handleLogout}>Logout</Button>
          </Toolbar>
        </AppBar>
      </Box>
      <div style={{ width: "500px", display: "flex", marginLeft: "35%" }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="firstname"
          label="Enter todo"
          name="firstname"
          autoComplete="firstname"
          autoCapitalize="name"
          autoFocus
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        {isEdit.status ? (
          <Button onClick={handleEdit}>Save</Button>
        ) : (
          <Button onClick={handleAdd}>Add</Button>
        )}
      </div>
      <div style={{ width: "500px", marginLeft: "35%" }}>
        {todo &&
          todo.map((el, l) => (
            <div style={{ display: "flex" }} key={l}>
              <h1>{el.content}</h1>

              <Button
                onClick={() => {
                  setIsEdit({ status: !isEdit.status, _id: el._id });
                  setInput(el.content);
                }}
              >
                Edit
              </Button>
              <Button onClick={() => handleDelete(el._id)}>Delete</Button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Todo;

