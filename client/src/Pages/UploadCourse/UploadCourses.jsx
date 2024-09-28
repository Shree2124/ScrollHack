import { useState } from 'react';
import {
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  InputLabel,
  Select,
  MenuItem,
  Box,
} from '@mui/material';
import axiosInstance from '../../utils/axios';
import { useSelector } from 'react-redux';

const UploadCourse = () => {
  const [courseTitle, setCourseTitle] = useState('');
  const [courseDescription, setCourseDescription] = useState('');
  const [courseCategory, setCourseCategory] = useState('');
  const [thumbnail, setThumbnail] = useState(null);
  const [tags, setTags] = useState('');
  const [price, setPrice] = useState('');
  const [courseDuration, setCourseDuration] = useState(null); 
  const { user } = useSelector(state => state.auth);

  const tagsArray = tags.split(',').map((tag) => tag.trim());

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!thumbnail) {
      alert("Please upload a thumbnail image.");
      return;
    }

    const formData = new FormData();
    formData.append('title', courseTitle);
    formData.append('description', courseDescription);
    formData.append('category', courseCategory);
    formData.append('duration', courseDuration);
    formData.append('createdBy', user._id);
    formData.append('price', price);
    formData.append('tags', JSON.stringify(tagsArray));
    formData.append('image', thumbnail); 

    try {
      const response = await axiosInstance.post("/course/new", formData, {
        headers: {
          'Content-Type': 'multipart/form-data' // Set the content type for file uploads
        }
      });
      console.log('Course created successfully:', response.data);
    } catch (error) {
      console.log('Error creating course:', error);
    }
  };

  const handleThumbnailChange = (e) => {
    setThumbnail(e.target.files[0]); // Set the first file only
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 8 }}>
      <Paper elevation={3} sx={{ padding: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Create Course
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box container spacing={2} display='flex' flexDirection='column' gap={4}>
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
              <TextField
                type='number'
                label="Duration"
                variant="outlined"
                fullWidth
                value={courseDuration}
                onChange={(e) => setCourseDuration(e.target.value)}
                required
              />
            </Box>
            <Box item xs={12}>
              <TextField
                label="Tags (comma separated)"
                variant="outlined"
                fullWidth
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="e.g., JavaScript, React, Node.js"
                required
              />
            </Box>
            <Box item xs={12}>
              <TextField
                label="Price"
                variant="outlined"
                fullWidth
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Rupees"
                required
              />
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

export default UploadCourse;
