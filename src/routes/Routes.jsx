import { createBrowserRouter } from "react-router";
import HomeLayout from "../layout/HomeLayout";
import HomePage from "../pages/HomePage";
import PublicPage from "../pages/PublicPage";
import PrivatePage from "../pages/PrivatePage";
import LoginPage from "../pages/LoginPage";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../layout/DashboardLayout";
import RegisterPage from "../pages/RegisterPage";
import AllUsers from "../pages/dashboardPages/AllUsers";
import Profile from "../pages/dashboardPages/Profile";
import Messages from "../pages/dashboardPages/Messages";
import CreateMessage from "../pages/dashboardPages/CreateMessages";
import MessageDetails from "../pages/dashboardPages/MessageDetails";

import AddBenefits from "../pages/dashboardPages/AddBenefits";
import AddBeneficiaries from "../pages/dashboardPages/AddBeneficiaries";
import AddProjects from "../pages/dashboardPages/AddProjects";
import LoadBeneficiaries from "../pages/dashboardPages/LoadBeneficiaries";
import LoadProjects from "../pages/dashboardPages/LoadProjects";
import LoadBenefits from "../pages/dashboardPages/LoadBenefits";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/public",
        element: <PublicPage />,
      },
      {
        path: "/private",
        element: (
          <PrivateRoute>
            <PrivatePage />
          </PrivateRoute>
        ),
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: "",
        element: <Profile />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "allUsers",
        element: <AllUsers />,
      },
      {
        path: "addBenefits",
        element: <AddBenefits />,
        loader: () => fetch("http://localhost:5000/benefits"),
      },
      {
        path: "addBeneficiaries",
        element: <AddBeneficiaries />,
        loader: () => fetch("http://localhost:5000/beneficiaries-data"),
      },
      {
        path: "addProjects",
        element: <AddProjects />,
        loader: () => fetch("http://localhost:5000/projects"),
      },
      {
        path: "loadBenefits",
        element: <LoadBenefits />,
        // loader: () => fetch("http://localhost:5000/benefits"),
      },
      {
        path: "loadBeneficiaries",
        element: <LoadBeneficiaries />,
      },
      {
        path: "loadProjects",
        element: <LoadProjects />,
        // loader: () => fetch("http://localhost:5000/projects"),
      },
      {
        path: "messages",
        element: <Messages />,
      },
      {
        path: "messages/:id",
        element: <MessageDetails />,
      },
      {
        path: "createMessage",
        element: <CreateMessage />,
      },
    ],
  },
]);

export default router;
