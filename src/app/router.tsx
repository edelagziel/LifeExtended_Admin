import { createBrowserRouter } from "react-router-dom";
import AdminLayout from "../components/layout/AdminLayout";
import DashboardPage from "../pages/Dashboard/DashboardPage";
import CreatePollPage from "../pages/CreatePoll/CreatePollPage";
import LivePollPage from "../pages/LivePoll/LivePollPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AdminLayout />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: "create", element: <CreatePollPage /> },
      { path: "live", element: <LivePollPage /> },
    ],
  },
]);
