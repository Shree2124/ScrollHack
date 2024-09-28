// import { useState } from "react";
// import axios from "../utils/axios.js";

// const Login = () => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post("/user/login", { username, password }).then((res) => {
//         console.log("Login success:", res.data);
//       });
//     } catch (err) {
//       setError(err.response?.data?.message || "Login failed");
//     }
//   };

//   return (
//     <div>
//       <h1>Login</h1>
//       <form onSubmit={handleLogin} >
//         <input
//           type="text"
//           placeholder="Username"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           required
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//         <button type="submit">Login</button>
//       </form>
//       {error && <p style={{ color: "red" }}>{error}</p>}
//     </div>
//   );
// };

// export default Login;

import { useState } from "react";
import { TextField, Button, Box, Paper, Typography } from "@mui/material";
import Container from "./container";
import { Link } from "react-router-dom";
import axiosInstance from "../utils/axios";
import {useDispatch} from "react-redux"
import { setError, setLoading, setUser } from "../redux/slices/authSlice";

const Login = () => {
  const dispatch = useDispatch()

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
      await axiosInstance
        .post("/user/login", {
          username: formData.username,
          password: formData.password
        })
        .then((res) => {
          dispatch(setUser(res.data.user))
          dispatch(setLoading(false))
          dispatch(setError(false))
        });
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
