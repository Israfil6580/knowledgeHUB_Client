import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import Dashboard from "./pages/Dashboard";
import BookedSession from "./Components/Dashboard_Components/BookedSession";
import CreateNotes from "./Components/Dashboard_Components/CreateNotes";
import ManageNotes from "./Components/Dashboard_Components/ManageNotes";
import StudyMaterials from "./Components/Dashboard_Components/StudyMaterials";
import SeeMaterials from "./Components/Dashboard_Components/SeeMaterials";
import CreateSession from "./Components/Dashboard_Components/CreateSession";
import AllMySession from "./Components/Dashboard_Components/AllMySession";
import UploadMaterials from "./Components/Dashboard_Components/UploadMaterials";
import ViewAllMaterials from "./Components/Dashboard_Components/ViewAllMaterials";
import ViewAllUsers from "./Components/Dashboard_Components/ViewAllUsers";
import PrivateRoute from "./Routes/PrivateRoutes";
import AdminRoute from "./Routes/AdminRoutes";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Homepage />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "registration",
        element: <Registration />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
      {
        path: "bookedsession",
        element: <BookedSession />,
      },
      {
        path: "createnotes",
        element: <CreateNotes />,
      },
      {
        path: "managenotes",
        element: <ManageNotes />,
      },
      {
        path: "studymaterials",
        element: <StudyMaterials />,
      },
      {
        path: "seematerials",
        element: <SeeMaterials />,
      },
      {
        path: "createsession",
        element: <CreateSession />,
      },
      {
        path: "myallsession",
        element: <AllMySession />,
      },
      {
        path: "uploadmaterials",
        element: <UploadMaterials />,
      },
      {
        path: "allmaterials",
        element: <ViewAllMaterials />,
      },
      {
        path: "viewallusers",
        element: (
          <AdminRoute>
            <ViewAllUsers />
          </AdminRoute>
        ),
      },
    ],
  },
]);
