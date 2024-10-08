import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
  Paper,
  IconButton,
  Drawer,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import useMediaQuery from "@mui/material/useMediaQuery";
import axiosInstance from "../../utils/axios"; // Import your axios instance
import { useParams } from "react-router-dom";

const CoursePage = () => {
  const { courseId } = useParams();
  const [currentModuleIndex, setCurrentModuleIndex] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [courseModules, setCourseModules] = useState([]); // Dynamically set modules here
  const isMobile = useMediaQuery("(max-width: 600px)");

  const toggleDrawer = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleNextModule = () => {
    if (currentModuleIndex < courseModules?.length - 1) {
      setCurrentModuleIndex(currentModuleIndex + 1);
    }
  };

  const handlePreviousModule = () => {
    if (currentModuleIndex > 0) {
      setCurrentModuleIndex(currentModuleIndex - 1);
    }
  };

  const fetchLectures = async () => {
    try {
      const response = await axiosInstance.get(`/lectures/${courseId}`);
      console.log(response);

      // Assuming API response has a structure similar to what you provided
      setCourseModules(response.data.lecture);
    } catch (error) {
      console.error("Error fetching lectures:", error);
    }
  };

  useEffect(() => {
    fetchLectures(); // Fetch lectures on component mount
  }, [courseId]);

  const currentModule = courseModules[currentModuleIndex];

  const sidebarContent = (
    <Box sx={{ width: isMobile ? 250 : 300, padding: 2 }}>
      <Typography variant="h6" gutterBottom>
        Course Modules
      </Typography>
      <Divider />
      <List>
        {courseModules.map((module, index) => (
          <ListItem
            button
            key={module._id} // Using _id from the response
            selected={index === currentModuleIndex}
            onClick={() => setCurrentModuleIndex(index)}
          >
            <ListItemText primary={module.title} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      {!isMobile && (
        <Paper
          sx={{
            position: "fixed",
            top: 64,
            left: 0,
            bottom: 60,
            width: 300,
            bgcolor: "#f5f5f5",
            boxShadow: 3,
            overflowY: "auto",
            zIndex: 1200,
          }}
        >
          {sidebarContent}
        </Paper>
      )}

      {isMobile && (
        <>
          <IconButton
            onClick={toggleDrawer}
            sx={{
              position: "fixed",
              top: 10,
              left: 10,
              zIndex: 1300,
              bgcolor: "white",
              borderRadius: "50%",
              boxShadow: 2,
            }}
          >
            <MenuIcon fontSize="large" />
          </IconButton>

          <Drawer anchor="left" open={mobileOpen} onClose={toggleDrawer}>
            {sidebarContent}
          </Drawer>
        </>
      )}

      <Container
        sx={{
          marginLeft: isMobile ? 0 : "300px",
          flex: 1,
          padding: 4,
          overflowY: "auto",
          height: "100vh",
          position: "relative",
          zIndex: 1,
        }}
      >
        {currentModule && (
          <>
            <Typography variant="h4" gutterBottom>
              {currentModule.title}
            </Typography>
            <Typography variant="body1" gutterBottom>
              {currentModule.description}
            </Typography>

            <Box sx={{ marginTop: 2, marginBottom: 4 }}>
              <Typography variant="h5">Lecture Video</Typography>
            </Box>

            <Box sx={{ marginTop: 2, marginBottom: 4 }}>
              <video
                controls
                width="100%"
                src={currentModule.video} // Use video from the API response
                alt={currentModule.title}
                style={{ maxHeight: "400px" }}
              ></video>
            </Box>
          </>
        )}

        {/* Module navigation buttons */}
        <Box
          sx={{
            marginTop: 4,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Button
            variant="contained"
            color="primary"
            disabled={currentModuleIndex === 0}
            onClick={handlePreviousModule}
          >
            Previous Module
          </Button>
          <Button
            variant="contained"
            color="primary"
            disabled={currentModuleIndex === courseModules.length - 1}
            onClick={handleNextModule}
          >
            Next Module
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default CoursePage;
