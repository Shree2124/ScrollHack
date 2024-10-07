
import { useState } from "react";
import { TextField, Button, Box, Paper, Typography } from "@mui/material";
import Container from "./container";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axios";
import {useDispatch} from "react-redux"
import { loginUser, setError, setLoading, setUser } from "../redux/slices/authSlice";
import useAuth from "../hooks/useAuth";

const Login = () => {
  // const {user} = useAuth()
  // console.log(user);
  
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // await axiosInstance
      //   .post("/user/login", {
      //     username: formData.username,
      //     password: formData.password
      //   })
      //   .then((res) => {
      //     dispatch(setUser(res.data.user))
      //     dispatch(setLoading(false))
      //     dispatch(setError(false))
      //   });

      dispatch(loginUser(formData))

        navigate('/all-courses',{replace:true})
    } catch (error) {
      console.log(error);
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
          gap: 4,
        }}
      >
        <Typography variant="h5" gutterBottom align="center">
          Login
        </Typography>

        <form onSubmit={handleSubmit} className="mt-2">
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
              Don&apos;t have an account?
              <span>
                {" "}
                <Link to="/signup" className="text-blue-500">
                  {" "}
                  register here{" "}
                </Link>
              </span>
            </Typography>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default Login;
