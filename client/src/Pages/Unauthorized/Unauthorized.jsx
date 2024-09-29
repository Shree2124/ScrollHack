import React from "react";
import {
  Container as MuiContainer,
  Typography,
  Button,
  Box,
  Paper,
} from "@mui/material";
import { Link } from "react-router-dom";
import LockIcon from "@mui/icons-material/Lock"; // Icon to represent restricted access
import { Container } from "../../components/index";

const Unauthorized = () => {
  return (
    <Container>
      <MuiContainer maxWidth="sm" sx={{ mt: 4, textAlign: "center" }}>
        <Paper elevation={3} sx={{ paddingY: 3 }}>
          <Box display="flex" justifyContent="center" mb={3}>
            <LockIcon sx={{ fontSize: 80, color: "red" }} />
          </Box>
          <Typography variant="h3" color="error" gutterBottom>
            Unauthorized Access
          </Typography>
          <Typography variant="body1" color="textSecondary" sx={{ mb: 4 }}>
            You do not have the necessary permissions to view this page.
            <br />
            Please contact your administrator if you believe this is a mistake.
          </Typography>
          <Button variant="contained" color="primary" size="large">
            <Link to="/">Go Back to Home</Link>
          </Button>
        </Paper>
      </MuiContainer>
    </Container>
  );
};

export default Unauthorized;
