import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Avatar,
  Button,
  Grid,
  Link,
  TextField,
  Typography,
  IconButton,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
});

export default function Login({ setShowLogin, setShowAuth, setUserData }) {
  const [showPassword, setShowPassword] = React.useState(false);
  const navigate = useNavigate();
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const url = `http://127.0.0.1:3001/user/login`;

      const response = await axios.post(url, {
        email: values.email,
        password: values.password,
      });
      if (response.status === 200) {
        setUserData({
          loggedIn: true,
          token: response.data.Message.token,
        });
        navigate("/dashboard");
      }
    },
  });

  return (
    <Dialog
      open
      onClose={() => setShowLogin(false)}
      PaperProps={{
        style: {
          padding: 20,
          width: 320,
          borderRadius: 10,
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        },
      }}
    >
      <DialogTitle align="center">
        <Avatar style={{ backgroundColor: "#1bbd7e", margin: "0 auto" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h2" variant="h5" style={{ margin: "10px 0" }}>
          Login
        </Typography>
      </DialogTitle>
      <DialogContent>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            id="email"
            name="email"
            label="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            margin="normal"
          />
          <TextField
            fullWidth
            id="password"
            name="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            margin="normal"
            InputProps={{
              endAdornment: (
                <IconButton onClick={handleClickShowPassword}>
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              ),
            }}
          />
          <Link
            href="#"
            variant="body2"
            style={{ display: "block", textAlign: "right", marginBottom: 20 }}
          >
            Forgot password?
          </Link>
          <Button
            color="primary"
            variant="contained"
            fullWidth
            type="submit"
            style={{ margin: "8px 0", backgroundColor: "#007bff" }}
          >
            Login
          </Button>
          <Typography>
            Don't have an account?{" "}
            <Link
              onClick={() => {
                setShowLogin(false);
              }}
              variant="body2"
              style={{ cursor: "pointer" }}
            >
              Signup
            </Link>
          </Typography>
          <Typography
            variant="subtitle1"
            align="center"
            style={{ margin: "10px 0" }}
          >
            Or
          </Typography>
          <Button
            variant="contained"
            fullWidth
            startIcon={<FacebookIcon />}
            style={{
              margin: "5px 0",
              backgroundColor: "#3b5998",
              color: "white",
            }}
          >
            Login with Facebook
          </Button>
          <Button
            variant="outlined"
            fullWidth
            startIcon={<GoogleIcon />}
            style={{ margin: "5px 0" }}
          >
            Login with Google
          </Button>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setShowAuth(false)} color="primary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}
