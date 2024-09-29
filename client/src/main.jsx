import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import { RouterProvider } from "react-router-dom";
import {
  HomePage,
  SignupPage,
  LoginPage,
  Courses,
  UploadCourse,
  AddCourseContent,
  OtpVerificationPage,
  CoursePage,
  EditCoursePage,
  ProfileUpdate,
  PaymentSuccessful,
  PaymentFailurePage,
  Unauthorized,
  OwnerCourses,
  EnrolledCourses,
  UserDetailsPage,
} from "./Pages/index.js";
import { createBrowserRouter } from "react-router-dom";
import "./index.css";
import { Dashboard } from "./components/index.js";
import AuthLayout from "./components/AuthLayout.jsx";
import CourseStudy from "./Pages/coursestudy/CourseStudy.jsx";


const ROLES = {
  user: "user",
  Admin: "admin",
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      /* Public Routes */
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/signup",
        element: <SignupPage />,
      },
      {
        path: "/unauthorized",
        element: <Unauthorized />,
      },
      {
        path: "/auth/otp-verification/:activationToken",
        element: <OtpVerificationPage />,
      },
      /* User Routes */
      {
        path: "/update-user-profile",
        element: (
          <AuthLayout allowedRoles={[ROLES.user]}>
            <ProfileUpdate />
          </AuthLayout>
        ),
      },
      {
        path: "/your-courses",
        element: (
          <AuthLayout allowedRoles={[ROLES.user]}>
            <CourseStudy />
          </AuthLayout>
        ),
      },
      {
        path: "/admin/dashboard",
        element: (
          <AuthLayout allowedRoles={[ROLES.Admin]}>
            <Dashboard />
          </AuthLayout>
        ),
      },
      {
        path: "/all-courses",
        element: (
          <AuthLayout allowedRoles={[ROLES.user, ROLES.Admin]}>
            <Courses />
          </AuthLayout>
        ),
      },
      {
        path: "/course-page/:courseId",
        element: (
          <AuthLayout allowedRoles={[ROLES.user]}>
            <CoursePage />
          </AuthLayout>
        ),
      },
      {
        path:"/enrolled-courses",
        element:(
          <AuthLayout allowedRoles={ROLES.user}>
            <EnrolledCourses/>
          </AuthLayout>
        )
      },
      {
        path:'/user-details',
        element:(
          <AuthLayout allowedRoles={ROLES.user}>
            <UserDetailsPage/>
          </AuthLayout>
        )
      },
      {
        path: "/payment-successful/:courseId",
        element: (
          <AuthLayout allowedRoles={[ROLES.user]}>
            <PaymentSuccessful />
          </AuthLayout>
        ),
      },
      {
        path: "/payment-fail/:courseId",
        element: (
          <AuthLayout allowedRoles={[ROLES.user]}>
            <PaymentFailurePage />
          </AuthLayout>
        ),
      },
      /* Admin Routes */
      {
        path: "/admin/upload-course",
        element: (
          <AuthLayout allowedRoles={[ROLES.Admin]}>
            <UploadCourse />
          </AuthLayout>
        ),
      },
      {
        path: "/admin/add-course-content/:courseId",
        element: (
          <AuthLayout allowedRoles={[ROLES.Admin]}>
            <AddCourseContent />
          </AuthLayout>
        ),
      },
      {
        path: "/admin/edit-course/:courseId",
        element: (
          <AuthLayout allowedRoles={[ROLES.Admin]}>
            <EditCoursePage />
          </AuthLayout>
        ),
      },
      {
        path: "/admin/owned-courses",
        element: (
          <AuthLayout allowedRoles={[ROLES.Admin]}>
            <OwnerCourses />
          </AuthLayout>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
