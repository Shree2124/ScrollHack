import React, { useState } from 'react';
import {
  Container as MUIContainer,
  Typography,
  TextField,
  Button,
  Paper,
  Box,
  Snackbar,
  IconButton,
} from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import EditIcon from '@mui/icons-material/Edit';
import { Container } from '../../components/index';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const UserProfile = () => {
  // Pre-filled user data (replace with actual data from your API)
  const initialUserData = {
    username: 'johndoe',
    email: 'johndoe@example.com',
    fullName: 'John Doe',
    previousPassword: '',
    newPassword: '',
    confirmPassword: '',
  };

  const [userDetails, setUserDetails] = useState(initialUserData);
  const [editing, setEditing] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserDetails({
      ...userDetails,
      [name]: value,
    });
  };

  const handleEdit = () => {
    setEditing(true);
  };

  const handleCancel = () => {
    setEditing(false);
    setUserDetails(initialUserData); // Reset to initial values
    setError(''); // Clear any previous error messages
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    // Dummy previous password for validation (replace with your actual logic)
    const actualPreviousPassword = 'currentPassword'; 

    if (userDetails.previousPassword !== actualPreviousPassword) {
      setError('Previous password is incorrect.');
      return;
    }

    if (userDetails.newPassword !== userDetails.confirmPassword) {
      setError('New passwords do not match.');
      return;
    }

    // Here you would typically send userDetails to your API to update the user profile
    console.log('User details submitted:', userDetails);
    setSnackbarMessage('Profile updated successfully!');
    setSnackbarOpen(true);
    setError('');
    setEditing(false); // Exit edit mode after successful submission
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Container>
    <MUIContainer maxWidth="sm" sx={{ marginTop: 2 }}>

      <Paper sx={{ padding: 2 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">User Profile</Typography>
          {!editing && (
            <IconButton onClick={handleEdit}>
              <EditIcon />
            </IconButton>
          )}
        </Box>
        <form onSubmit={handleSubmit}>
          <Box display="flex" flexDirection="column" gap={2} mt={2}>
            <TextField
              label="Username"
              name="username"
              value={userDetails.username}
              onChange={handleChange}
              required
              disabled={!editing} // Disable when not editing
            />
            <TextField
              label="Email"
              name="email"
              type="email"
              value={userDetails.email}
              onChange={handleChange}
              required
              disabled={!editing} // Disable when not editing
            />
            <TextField
              label="Full Name"
              name="fullName"
              value={userDetails.fullName}
              onChange={handleChange}
              required
              disabled={!editing} // Disable when not editing
            />
            {editing && (
              <>
                <TextField
                  label="Previous Password"
                  name="previousPassword"
                  type="password"
                  value={userDetails.previousPassword}
                  onChange={handleChange}
                  required
                  error={!!error && error.includes('Previous password')}
                  helperText={error && error.includes('Previous password') ? error : ''}
                />
                <TextField
                  label="New Password"
                  name="newPassword"
                  type="password"
                  value={userDetails.newPassword}
                  onChange={handleChange}
                  required
                  error={!!error && error.includes('do not match')}
                  helperText={error && error.includes('do not match') ? error : ''}
                />
                <TextField
                  label="Confirm New Password"
                  name="confirmPassword"
                  type="password"
                  value={userDetails.confirmPassword}
                  onChange={handleChange}
                  required
                  error={!!error && error.includes('do not match')}
                  helperText={error && error.includes('do not match') ? error : ''}
                />
                <Box display="flex" gap={2} mt={2}>
                  <Button variant="contained" color="primary" type="submit">
                    Save Changes
                  </Button>
                  <Button variant="outlined" onClick={handleCancel}>
                    Cancel
                  </Button>
                </Box>
              </>
            )}
          </Box>
        </form>
      </Paper>
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="success">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </MUIContainer>
    </Container>
  );
};

export default UserProfile;
