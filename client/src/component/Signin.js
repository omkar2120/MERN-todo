import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Swal from "sweetalert2";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";
import { height } from "@mui/system";
import axios from "axios";

const Signin = () => {
  const navigate = useNavigate();

  const [show, setShow] = React.useState(false);

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("username is required"),
    email: Yup.string().required("Email is required").email("Email is invalid"),
    // pno: Yup.number().required( "Phone Number is required").min(10,"Mobile Number it should 10 numbers"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters")
      .max(40, "Password must not exceed 40 characters"),
  });
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (data) => {
      try {
        const payload = {
          username: data.username,
          email: data.email,
          password: data.password,
        };
        let url = "http://localhost:3001/signin";
        const request = await axios.post(url, payload);
        console.log(request);
        if (request.status === 200) {
          Swal.fire(`${request.data.message}`);
          navigate("/");
        } else {
          Swal.fire(`${request.data.message}`);
        }
      } catch (err) {
        Swal.fire(`${err.message}`);
      }
    },
  });

  return (
    <div>
      <Box
        sx={{
          marginTop: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        onSubmit={formik.handleSubmit}
      >
        <Typography component="h1" variant="h4">
          Sign In
        </Typography>
        <Box component="form" sx={{ width: "30%" }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="username"
            name="username"
            autoComplete="username"
            autoCapitalize="false"
            autoFocus
            onChange={formik.handleChange}
            value={formik.values.username}
          />
          <p className="error">
            {formik.errors.username ? formik.errors.username : null}
          </p>

          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          <p className="error">
            {formik.errors.email ? formik.errors.email : null}
          </p>

          <div style={{ display: "flex" }}>
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={show ? "text" : "password"}
              id="password"
              autoComplete="current-password"
              onChange={formik.handleChange}
              value={formik.values.password}
            />
            {/*  */}

            <Button variant="primary" onClick={() => setShow(!show)}>
              {show ? <VisibilityOffIcon /> : <VisibilityRoundedIcon />}
            </Button>
          </div>

          <p className="error">
            {formik.errors.password ? formik.errors.password : null}
          </p>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            onSubmit={formik.handleSubmit}
            sx={{ mt: 3, mb: 2 }}
            disabled={!formik.isValid}
          >
            Sign In
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default Signin;
