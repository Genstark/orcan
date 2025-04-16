import "./App.css";
import Login from "./Pages/Login";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Pages/Home";
import ErrorPage from "./Pages/Error";
import Root from "./Pages/Root";
import Dashboard from "./Pages/Dashboard";
import User from "./Pages/User";
import ClinicUser from "./Pages/ClinicUser";
import Terms from "./Pages/Terms";
import Privacy from "./Pages/Privacy";
import ClinicDashboard from "./Pages/ClinicDashboard";
import ClinicLogin from "./Pages/Clinic-Login";
import ClinicRoot from "./Pages/ClinicRoot";
import PatientHistory from "./Pages/PatientHistory";
import UserDataUpdate from "./Pages/user/UserDataUpdate";
import Question from "./Pages/user/Question";
import UserDataProfile from "./Pages/user/UserDataProfile";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/staff",
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/clinic",
    element: <ClinicLogin />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/privacy-policy",
    element: <Privacy />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/terms-conditions",
    element: <Terms />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/dashboard",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <Dashboard />,
      },
      {
        path: "clinic-users",
        element: <ClinicUser />,
      },
      {
        path: "users",
        element: <User />,
      },
    ],
  },
  {
    path: "/clinic-dashboard",
    element: <ClinicRoot />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <ClinicDashboard />,
      },
      {
        path: "patient-history",
        element: <PatientHistory />,
      },
      {
        path: "userdata-update",
        element: <UserDataUpdate />,
      },
      {
        path: "userdata-update-ques",
        element: <Question />,
      },
      {
        path: "userdata-profile",
        element: <UserDataProfile />,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
