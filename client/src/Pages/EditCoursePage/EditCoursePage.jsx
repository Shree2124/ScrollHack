import React, { useState } from "react";
import {
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  TextField,
  Paper,
  IconButton,
  Box,
} from "@mui/material";
import { Container } from "../../components";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const EditCourse = () => {
  const { courses } = useSelector((state) => state.auth);
  console.log(courses);
  
  // Temporary data for course modules
  const [modules, setModules] = useState([
    {
      _id: 1,
      title: "Module 1: Introduction",
      description: "Overview of the course",
    },
    {
      _id: 2,
      title: "Module 2: Advanced Topics",
      description: "In-depth analysis",
    },
    {
      _id: 3,
      title: "Module 3: Conclusion",
      description: "Summary of the course",
    },
    ...courses,
  ]);

  console.log(modules);
  

  // State to manage the editing of a module
  const [editIndex, setEditIndex] = useState(null);
  const [editedModule, setEditedModule] = useState({
    title: "",
    description: "",
  });
  const { courseId } = useParams();
  const navigate = useNavigate();

  const handleEditClick = (index) => {
    setEditIndex(index);
    setEditedModule(modules[index]);
  };

  const handleDeleteClick = (id) => {
    setModules(modules.filter((module) => module.id !== id));
  };

  const handleSaveClick = () => {
    const updatedModules = [...modules];
    updatedModules[editIndex] = editedModule;
    setModules(updatedModules);
    setEditIndex(null);
    setEditedModule({ title: "", description: "" });
  };

  const handleAddModule = (courseId) => {
    courseId
    navigate(`/admin/add-course-content/${courseId?._id}`);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Edit Course Modules
      </Typography>
      <List>
        {modules.map((module, index) => (
          <ListItem key={module.id}>
            {editIndex === index ? (
              <Paper sx={{ padding: 2, width: "100%" }}>
                <TextField
                  label="Title"
                  value={editedModule.title}
                  onChange={(e) =>
                    setEditedModule({ ...editedModule, title: e.target.value })
                  }
                  fullWidth
                  sx={{ marginBottom: 1 }}
                />
                <TextField
                  label="Description"
                  value={editedModule.description}
                  onChange={(e) =>
                    setEditedModule({
                      ...editedModule,
                      description: e.target.value,
                    })
                  }
                  fullWidth
                  sx={{ marginBottom: 1 }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ marginTop: 2 }}
                  onClick={()=>handleAddModule(module)}
                >
                  Add Module
                </Button>
                <Button
                sx={{
                  marginRight: "5px"
                }}
                  variant="contained"
                  color="primary"
                  onClick={handleSaveClick}
                >
                  Save
                </Button>
              </Paper>
            ) : (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <ListItemText
                  primary={module.title}
                  secondary={module.description}
                />
                <Box>
                  <IconButton
                    edge="end"
                    aria-label="edit"
                    onClick={() => handleEditClick(index)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => handleDeleteClick(module.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Box>
            )}
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default EditCourse;
