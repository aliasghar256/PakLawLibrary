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

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

export default function SignUp({ setShowLogin , setShowAuth}) {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
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
        <Typography component="h1" variant="h5" style={{ margin: "10px 0" }}>
          Signup
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
            label="Create password"
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
          <TextField
            fullWidth
            id="confirmPassword"
            name="confirmPassword"
            label="Confirm password"
            type={showPassword ? "text" : "password"}
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.confirmPassword &&
              Boolean(formik.errors.confirmPassword)
            }
            helperText={
              formik.touched.confirmPassword && formik.errors.confirmPassword
            }
            margin="normal"
            InputProps={{
              endAdornment: (
                <IconButton onClick={handleClickShowPassword}>
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              ),
            }}
          />
          <Button
            color="primary"
            variant="contained"
            fullWidth
            type="submit"
            style={{ margin: "8px 0", backgroundColor: "#007bff" }}
          >
            Signup
          </Button>
          <Typography>
            Already have an account?{" "}
            <Link
              onClick={() => setShowLogin(true)}
              variant="body2"
              style={{ cursor: "pointer" }}
            >
              Login
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
);}