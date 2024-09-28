import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import { RouterProvider } from "react-router-dom";
import {HomePage,SignupPage,LoginPage,Courses,UploadCourse, AddCourseContent} from './Pages/index.js'
import { createBrowserRouter } from "react-router-dom";
import './index.css'


const router = createBrowserRouter([
  {
    path:'/',
    element:<App/>,
    children:[
      { 
        path:'/',
       element:<HomePage/>
      },
      {
        path:'/login',
        element:<LoginPage/>
      },
      {
        path:'/signup',
        element:<SignupPage/>
      },
      {
        path:'/all-courses',
        element:<Courses/>
      },
      {
        path:'/admin/upload-course',
        element:<UploadCourse/>
      },
      {
        path:'/admin/add-course-content/:courseId',
        element:<AddCourseContent/>
      }
    ]
  }
])
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </StrictMode>
);
