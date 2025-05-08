import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import HomePage from "./routes/HomePage";
import EditPage from "./routes/EditPage";
import UpdatePage from "./routes/UpdatePage";

// Route components (all the different pages of the app and where they are located)
const router = createBrowserRouter(
  [
    { path: "/", element: <HomePage /> },
    { path: "/update", element: <UpdatePage /> },
    { path: "/edit/:userId", element: <EditPage /> },
  ],
  { basename: "" } // This is where you set the base path
);

// DOM elements (see presentation for detailed explanation)
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
