import React from 'react'
import ReactDOM from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import './index.css'
import HomePage from "./pages/home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Deteksi from "./pages/Deteksi.jsx";
import Saved from "./pages/Saved.jsx";
import ForgorPassword from "./pages/ForgorPassword.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import Profile from "./pages/Profile.jsx";
import EditProfile from "./pages/EditProfile.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <HomePage/>,
    },
    {
        path: "/login",
        element: <Login/>,
    },
    {
        path: "/register",
        element: <Register/>
    },
    {
        path: "/deteksi",
        element: <Deteksi/>
    },
    {
        path: "/saved",
        element: <Saved/>
    },
    {
        path: "forgot-password",
        element: <ForgorPassword/>
    },
    {
        path: "reset-password/:token",
        element: <ResetPassword/>
    },
    {
        path: "/profile",
        element: <Profile/>
    },
    {
        path:"/edit-profile",
        element: <EditProfile/>
    }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>,
)
