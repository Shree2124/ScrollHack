
import React, { useState } from "react";
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
import MenuIcon from "@mui/icons-material/Menu"; // Make sure this import is correct
import useMediaQuery from "@mui/material/useMediaQuery";

// Example data for the modules
const courseModules = [
  {
    id: 1,
    title: "Introduction to React",
    description: "Learn the basics of React.",
    videoUrl: "/videos/react-intro.mp4",
  },
  {
    id: 2,
    title: "State Management in React",
    description: "Dive into useState and useReducer.",
    videoUrl: "/videos/react-state.mp4",
  },
  {
    id: 3,
    title: "React Router",
    description: "Learn how to navigate between pages.",
    videoUrl: "/videos/react-router.mp4",
  },
  {
    id: 4,
    title: "Advanced React Patterns",
    description: "Explore advanced patterns in React.",
    videoUrl: "/videos/react-advanced.mp4",
  },
];

const CoursePage = () => {
  const [currentModuleIndex, setCurrentModuleIndex] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const currentModule = courseModules[currentModuleIndex];
  const isMobile = useMediaQuery("(max-width: 600px)");

  const toggleDrawer = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleNextModule = () => {
    if (currentModuleIndex < courseModules.length - 1) {
      setCurrentModuleIndex(currentModuleIndex + 1);
    }
  };

  const handlePreviousModule = () => {
    if (currentModuleIndex > 0) {
      setCurrentModuleIndex(currentModuleIndex - 1);
    }
  };

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
            key={module.id}
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
      {/* Sidebar for desktop */}
      {!isMobile && (
        <Paper
          sx={{
            position: "fixed",
            top: 64, // Adjust to leave space for the navbar height
            left: 0,
            bottom: 60, // Adjust to leave space for the footer height
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

      {/* Drawer for mobile */}
      {isMobile && (
        <>
          <IconButton
            onClick={toggleDrawer}
            sx={{
              position: "fixed",
              top: 10,
              left: 10,
              zIndex: 1300, // Ensure it appears above the navbar
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

      {/* Main content for video and module details */}
      <Container
        sx={{
          marginLeft: isMobile ? 0 : "300px", // Adjust for sidebar width
          flex: 1,
          padding: 4,
          overflowY: "auto",
          height: "100vh",
          position: "relative",
          zIndex: 1,

        }}
      >
        <Typography variant="h4" gutterBottom>
          {currentModule.title}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {currentModule.description}
        </Typography>


        <Box sx={{ marginTop: 2, marginBottom: 4 }}>
          <video
            controls
            width="100%"
            src={currentModule.videoUrl}
            alt={currentModule.title}
            style={{ maxHeight: "400px" }}
          >
            Your browser does not support the video tag.
          </video>
        </Box>

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

