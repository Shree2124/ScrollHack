import { useState } from "react";
import { TextField, Button, Box, Paper, Typography } from "@mui/material";
import Container from '../../components/container'; 
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import axiosInstance from "../../utils/axios";
import useAuth from "../../hooks/useAuth";

const OtpVerification = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const{activationToken} = useParams()
  const [formData, setFormData] = useState({
    otp: "",
  });

  const [error, setErrorMessage] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formData.otp);
    
    try {
      await axiosInstance
        .post("/user/verify", {
          otp: formData.otp,
          activationToken:activationToken
        })
        .then((res) => {
          dispatch(setUser(res.data.user));
          dispatch(setLoading(false));
          dispatch(setError(false));
        });
        navigate("/login"); 
    } catch (error) {
      console.log(error);
      setErrorMessage("Invalid OTP. Please try again.");
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
          OTP Verification
        </Typography>

        <form onSubmit={handleSubmit} className="mt-2">
          <Box display="flex" flexDirection="column" gap={2}>
            <Box item xs={12}>
              <TextField
                fullWidth
                label="Enter OTP"
                name="otp"
                value={formData.otp}
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
                Verify OTP
              </Button>
            </Box>

            {error && (
              <Typography color="error" variant="body2" align="center">
                {error}
              </Typography>
            )}

            <Typography variant="body2" align="center">
              Didn't receive an OTP?{" "}
              <span>
                <Link
                  to="#"
                  className="text-blue-500"
                  onClick={() => {
                    alert("Resending OTP...");
                  }}
                >
                  Resend OTP
                </Link>
              </span>
            </Typography>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default OtpVerification;
