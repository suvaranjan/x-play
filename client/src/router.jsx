import { Navigate, createBrowserRouter } from "react-router-dom";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import NavLayout from "./components/NavLayout";
import Dashboard from "./components/Dashboard";
import AuthLayout from "./components/auth/AuthLayout";
import TeamParent from "./components/team/TeamParent";
import CreateTeam from "./components/team/CreateTeam";
import AllTeam from "./components/team/AllTeam";
import Players from "./components/players/Players";
import Notification from "./components/Notification";
import TeamInvitation from "./components/others/TeamInvitation";
import ContractOffers from "./components/others/ContractOffers";
import CreateMatch from "./components/match/CreateMatch";
import Profile from "./components/user/Profile";
import TeamJoinReq from "./components/others/TeamJoinReq";
import TeamReminder from "./components/team/TeamReminder";

export const router = createBrowserRouter([
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
  {
    path: "/",
    element: <NavLayout />,
    children: [
      { index: true, element: <Navigate to="/dashboard" /> },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "teams",
        element: <AllTeam />,
      },
      {
        path: "/team/:id",
        element: <TeamParent />,
      },
      {
        path: "/create-team",
        element: <CreateTeam />,
      },
      {
        path: "/players",
        element: <Players />,
      },
      {
        path: "/notification",
        element: <Notification />,
      },
      {
        path: "/team-invitations",
        element: <TeamInvitation />,
      },
      {
        path: "/team-contracts",
        element: <ContractOffers />,
      },
      {
        path: "/create-match",
        element: <CreateMatch />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/team-join-requests",
        element: <TeamJoinReq />,
      },
      {
        path: "/team-reminder",
        element: <TeamReminder />,
      },
    ],
  },
]);
