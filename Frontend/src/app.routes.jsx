import { createBrowserRouter } from "react-router";
import Login from "./features/auth/pages/Login";
import Register from "./features/auth/pages/Register";
import FaceExpression from "./features/expression/components/FaceExpression";
import Home from "./features/pages/Home";
import Protected from "./features/auth/components/Protected";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/mood-sync",
    element: (
      <Protected>
        <FaceExpression />
      </Protected>
    ),
  },
  {
    path: "/",
    element: <Home />,
  },
]);
