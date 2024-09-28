import React, { useState } from "react";
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
import { Link } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    fullname: "",
    role: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

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
      await axios
        .post("/user/login", { username, password })
        .then((res) => {
          console.log("Registration success:", res.data);
        });
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <Container>
      <Paper
        sx={{
          padding: 2,
          maxWidth: 400,
          margin: "auto",
          boxShadow: 3, // Increased shadow level (1 to 24)
        }}
      >
        <Typography variant="h5" gutterBottom align="center">
          Resgister yourself
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
                name="fullname"
                value={formData.fullname}
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
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default Register;