// import React, { useState } from 'react';
// import {
//   Container,
//   TextField,
//   Button,
//   Typography,
//   Box,
//   Paper,
//   InputLabel,
// } from '@mui/material';
// import { useParams } from 'react-router-dom';

// const AddCourseContent = () => {
//   const { courseId } = useParams(); // Extract course ID from URL params
//   const [videoFile, setVideoFile] = useState(null);
//   const [pdfFile, setPdfFile] = useState(null);
//   const [otherFiles, setOtherFiles] = useState([]);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log({
//       courseId,
//       videoFile,
//       pdfFile,
//       otherFiles,
//     });
//   };

//   const handleVideoChange = (e) => {
//     setVideoFile(e.target.files[0]);
//   };

//   const handlePdfChange = (e) => {
//     setPdfFile(e.target.files[0]);
//   };

//   const handleOtherFilesChange = (e) => {
//     setOtherFiles([...e.target.files]);
//   };

//   return (
//     <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
//       <Paper elevation={3} sx={{ padding: 3 }}>
//         <Typography variant="h4" component="h1" gutterBottom>
//           Add Course Content for Course ID: {courseId}
//         </Typography>
//         <form onSubmit={handleSubmit}>
//           <Box container spacing={2} display='flex' flexDirection='column' gap={4}>
//             <Box item xs={12}>
//               <InputLabel id="video-upload-label">Upload Video</InputLabel>
//               <input
//                 accept="video/*"
//                 id="video-upload"
//                 type="file"
//                 onChange={handleVideoChange}
//                 style={{ display: 'none' }}
//               />
//               <label htmlFor="video-upload">
//                 <Button variant="contained" component="span">
//                   Upload Video
//                 </Button>
//               </label>
//               {videoFile && (
//                 <Typography variant="body2" sx={{ mt: 1 }}>
//                   Selected file: {videoFile.name}
//                 </Typography>
//               )}
//             </Box>
//             <Box item xs={12}>
//               <InputLabel id="pdf-upload-label">Upload PDF</InputLabel>
//               <input
//                 accept="application/pdf"
//                 id="pdf-upload"
//                 type="file"
//                 onChange={handlePdfChange}
//                 style={{ display: 'none' }}
//               />
//               <label htmlFor="pdf-upload">
//                 <Button variant="contained" component="span">
//                   Upload PDF
//                 </Button>
//               </label>
//               {pdfFile && (
//                 <Typography variant="body2" sx={{ mt: 1 }}>
//                   Selected file: {pdfFile.name}
//                 </Typography>
//               )}
//             </Box>
//             <Box item xs={12}>
//               <InputLabel id="other-files-upload-label">Upload Other Files</InputLabel>
//               <input
//                 accept="*"
//                 id="other-files-upload"
//                 type="file"
//                 multiple
//                 onChange={handleOtherFilesChange}
//                 style={{ display: 'none' }}
//               />
//               <label htmlFor="other-files-upload">
//                 <Button variant="contained" component="span">
//                   Upload Other Files
//                 </Button>
//               </label>
//               {otherFiles.length > 0 && (
//                 <Typography variant="body2" sx={{ mt: 1 }}>
//                   Selected files: {otherFiles.map((file) => file.name).join(', ')}
//                 </Typography>
//               )}
//             </Box>
//             <Box item xs={12}>
//               <Button type="submit" variant="contained" color="primary" fullWidth>
//                 Add Content
//               </Button>
//             </Box>
//           </Box>
//         </form>
//       </Paper>
//     </Container>
//   );
// };

// export default AddCourseContent;

import React, { useState } from 'react';
import {
  Container,
  Button,
  Typography,
  Box,
  Paper,
  InputLabel,
  TextField,
} from '@mui/material';
import { useParams } from 'react-router-dom';

const ManageCourseModules = () => {
  const { courseId } = useParams(); // Extract course ID from URL params
  const [modules, setModules] = useState([{ title: '', description: '', videoFile: null, pdfFile: null, otherFiles: [] }]);

  const handleModuleChange = (index, field, value) => {
    const updatedModules = [...modules];
    updatedModules[index][field] = value;
    setModules(updatedModules);
  };

  const handleVideoChange = (index, e) => {
    const updatedModules = [...modules];
    updatedModules[index].videoFile = e.target.files[0];
    setModules(updatedModules);
  };

  const handlePdfChange = (index, e) => {
    const updatedModules = [...modules];
    updatedModules[index].pdfFile = e.target.files[0];
    setModules(updatedModules);
  };

  const handleOtherFilesChange = (index, e) => {
    const updatedModules = [...modules];
    updatedModules[index].otherFiles = [...e.target.files];
    setModules(updatedModules);
  };

  const addModule = () => {
    setModules([...modules, { title: '', description: '', videoFile: null, pdfFile: null, otherFiles: [] }]);
  };

  const deleteModule = (index) => {
    const updatedModules = modules.filter((_, i) => i !== index);
    setModules(updatedModules);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle submission logic (e.g., send modules data to the server)
    console.log({ courseId, modules });
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 8 }}>
      <Paper elevation={3} sx={{ padding: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Manage Modules for Course ID: {courseId}
        </Typography>
        <form onSubmit={handleSubmit}>
          {modules.map((module, index) => (
            <Paper key={index} sx={{ padding: 2, marginBottom: 2 }}>
              <Typography variant="h6">Module {index + 1}</Typography>
              <Box container spacing={2} display='flex' flexDirection='column' gap={4}>
                <Box item xs={12}>
                  <TextField
                    label="Module Title"
                    variant="outlined"
                    fullWidth
                    value={module.title}
                    onChange={(e) => handleModuleChange(index, 'title', e.target.value)}
                    required
                  />
                </Box>
                <Box item xs={12}>
                  <TextField
                    label="Module Description"
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={3}
                    value={module.description}
                    onChange={(e) => handleModuleChange(index, 'description', e.target.value)}
                    required
                  />
                </Box>
                <Box item xs={12}>
                  <InputLabel id={`video-upload-label-${index}`}>Upload Video</InputLabel>
                  <input
                    accept="video/*"
                    id={`video-upload-${index}`}
                    type="file"
                    onChange={(e) => handleVideoChange(index, e)}
                    style={{ display: 'none' }}
                  />
                  <label htmlFor={`video-upload-${index}`}>
                    <Button variant="contained" component="span">
                      Upload Video
                    </Button>
                  </label>
                  {module.videoFile && (
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      Selected file: {module.videoFile.name}
                    </Typography>
                  )}
                </Box>
                <Box item xs={12}>
                  <InputLabel id={`pdf-upload-label-${index}`}>Upload PDF</InputLabel>
                  <input
                    accept="application/pdf"
                    id={`pdf-upload-${index}`}
                    type="file"
                    onChange={(e) => handlePdfChange(index, e)}
                    style={{ display: 'none' }}
                  />
                  <label htmlFor={`pdf-upload-${index}`}>
                    <Button variant="contained" component="span">
                      Upload PDF
                    </Button>
                  </label>
                  {module.pdfFile && (
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      Selected file: {module.pdfFile.name}
                    </Typography>
                  )}
                </Box>
                <Box item xs={12}>
                  <InputLabel id={`other-files-upload-label-${index}`}>Upload Other Files</InputLabel>
                  <input
                    accept="*"
                    id={`other-files-upload-${index}`}
                    type="file"
                    multiple
                    onChange={(e) => handleOtherFilesChange(index, e)}
                    style={{ display: 'none' }}
                  />
                  <label htmlFor={`other-files-upload-${index}`}>
                    <Button variant="contained" component="span">
                      Upload Other Files
                    </Button>
                  </label>
                  {module.otherFiles.length > 0 && (
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      Selected files: {module.otherFiles.map((file) => file.name).join(', ')}
                    </Typography>
                  )}
                </Box>
                <Box item xs={12}>
                  <Button variant="outlined" color="secondary" onClick={() => deleteModule(index)}>
                    Delete Module
                  </Button>
                </Box>
              </Box>
            </Paper>
          ))}
          <Button variant="contained" color="primary" onClick={addModule} sx={{ mt: 2 }}>
            Add Another Module
          </Button>
          <Box item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
              Save Modules
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default ManageCourseModules;

