import { useState } from "react";
import {
  TextField,
  Button,
  MenuItem,
  Box,
  Paper,
  Typography,
} from "@mui/material";
import axios from "../utils/axios.js";
import Container from "./container";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setActivationCode } from "../redux/slices/authSlice.js";
import axiosInstance from "../utils/axios.js";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    fullName: "",
    role: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axiosInstance.post("/user/register", {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        fullName: formData.fullName,
        role: formData.role,
      });

      console.log(data.activationToken);

      navigate(`/auth/otp-verification/${data.activationToken}`);
    } catch (err) {
      setError(err?.response?.data?.message || "Registration failed");
    }
  };

  return (
    <Container>
      <Paper
        sx={{
          padding: 2,
          maxWidth: 400,
          margin: "auto",
          boxShadow: 3,
          // Increased shadow level (1 to 24)
        }}
      >
        <Typography variant="h5" gutterBottom align="center">
          Register yourself
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box display="flex" flexDirection="column" gap={2}>
            <Box item xs={12}>
              <TextField
                fullWidth
                label="Username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </Box>
            <Box item xs={12}>
              <TextField
                fullWidth
                label="Full Name"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </Box>
            <Box item xs={12}>
              <TextField
                select
                fullWidth
                label="Role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
              >
                <MenuItem value="admin">Admin</MenuItem>
                <MenuItem value="user">Student</MenuItem>
              </TextField>
            </Box>
            <Box item xs={12}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Box>
            <Box item xs={12}>
              <TextField
                fullWidth
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </Box>
            <Box item xs={12}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
              >
                Submit
              </Button>
            </Box>
            <Typography variant="h10" gutterBottom>
              Already have an account?
              <span>
                {" "}
                <Link to="/login" className="text-blue-500">
                  {" "}
                  login here{" "}
                </Link>
              </span>
            </Typography>
            <Typography variant="h10" color="warning" gutterBottom>
              {error}
            </Typography>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default Register;
