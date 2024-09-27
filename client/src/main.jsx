import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import { RouterProvider } from "react-router-dom";
import {HomePage,SignupPage,LoginPage} from './Pages/index.js'
import { createBrowserRouter } from "react-router-dom";
import './index.css'
import SignupPage from "../Pages/Signup/SignupPage.jsx";
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
