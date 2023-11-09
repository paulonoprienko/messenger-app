import React from "react";
import ReactDOM from "react-dom/client";
import {
  // createBrowserRouter,
  createHashRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import Root from "./routes/root";
import ChatContainer from "./components/chatContainer/chatContainer";
import ErrorPage from "./error-page";
import ChatContainerIndex from "./components/chatContainer/chatContainerIndex";
import { SocketProvider } from "./contexts/socket/socketContext";
import { AuthProvider } from "./contexts/auth/authContext";
import Login from "./routes/login";
import { MessengerProvider } from "./contexts/messenger/messengerContext";
import "bootstrap/dist/css/bootstrap.min.css";
import HelpPage from "./components/helpPage/helpPage";

const router = createHashRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <ChatContainerIndex /> },
      {
        errorElement: <ErrorPage />,
        children: [
          {
            path: "/:chatId",
            element: <ChatContainer />,
          },
          {
            path: "/help-page",
            element: <HelpPage />,
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <ErrorPage />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthProvider>
    <SocketProvider>
      <MessengerProvider>
        <RouterProvider router={router} />
      </MessengerProvider>
    </SocketProvider>
  </AuthProvider>
);
