import React, { useState } from 'react';
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  InputLabel,
  Select,
  MenuItem,
  Box,
} from '@mui/material';

const CreateCourse = () => {
  const [courseTitle, setCourseTitle] = useState('');
  const [courseDescription, setCourseDescription] = useState('');
  const [courseCategory, setCourseCategory] = useState('');
  const [thumbnail, setThumbnail] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic (e.g., send data to the server)
    console.log({
      courseTitle,
      courseDescription,
      courseCategory,
      thumbnail,
    });
  };

  const handleThumbnailChange = (e) => {
    setThumbnail(e.target.files[0]);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ padding: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Create Course
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box container spacing={2}>
            <Box item xs={12}>
              <TextField
                label="Course Title"
                variant="outlined"
                fullWidth
                value={courseTitle}
                onChange={(e) => setCourseTitle(e.target.value)}
                required
              />
            </Box>
            <Box item xs={12}>
              <TextField
                label="Course Description"
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                value={courseDescription}
                onChange={(e) => setCourseDescription(e.target.value)}
                required
              />
            </Box>
            <Box item xs={12}>
              <InputLabel id="course-category-label">Category</InputLabel>
              <Select
                labelId="course-category-label"
                value={courseCategory}
                onChange={(e) => setCourseCategory(e.target.value)}
                fullWidth
                required
              >
                <MenuItem value="Programming">Programming</MenuItem>
                <MenuItem value="Design">Design</MenuItem>
                <MenuItem value="Marketing">Marketing</MenuItem>
                <MenuItem value="Business">Business</MenuItem>
                <MenuItem value="Photography">Photography</MenuItem>
                <MenuItem value="Music">Music</MenuItem>
                {/* Add more categories as needed */}
              </Select>
            </Box>
            <Box item xs={12}>
              <input
                accept="image/*"
                id="thumbnail-upload"
                type="file"
                onChange={handleThumbnailChange}
                style={{ display: 'none' }}
              />
              <label htmlFor="thumbnail-upload">
                <Button variant="contained" component="span">
                  Upload Thumbnail
                </Button>
              </label>
              {thumbnail && (
                <Typography variant="body2" sx={{ mt: 1 }}>
                  Selected file: {thumbnail.name}
                </Typography>
              )}
            </Box>
            <Box item xs={12}>
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Create Course
              </Button>
            </Box>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default CreateCourse;
