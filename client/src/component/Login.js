import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useFormik, handleChange, handleSubmit, isValid } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [show, setShow] = React.useState(false);

  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Email is required").email("Email is invalid"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters")
      .max(40, "Password must not exceed 40 characters"),
  });
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (data) => {
      try {
        const payload = {
          email: data.email,
          password: data.password,
        };
        console.log("ppppp", payload);
        const url = "http://localhost:3001/login";
        const request = await axios.post(url, payload);
        console.log(request);
        if (request) {
          localStorage.setItem("userInfo", JSON.stringify(request));
          if (request.status === 200) {
            Swal.fire(`${request.data.message}`, <h1></h1>, "");
            navigate("/todo");
          } else if (request.status === 400) {
            Swal.fire(`${request.data.message}`, <h1></h1>, "");
            navigate("/");
          }
        }
      } catch (err) {}
    },
  });
  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        onSubmit={formik.handleSubmit}
      >
        <Typography component="h1" variant="h4">
          Log In
        </Typography>
        <Box component="form" sx={{ mt: 1, width: "30%" }}>
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
          <Grid container>
            <Grid item>
              <Link href="signin" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </div>
  );
};

export default Login;
