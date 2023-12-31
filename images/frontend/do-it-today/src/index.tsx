import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css';
import Root from './Root';
import ErrorPage from './pages/error/errorPage';
import LoginPage from './pages/login/loginPage';
import HomePage from './pages/home/homePage';
import RegisterPage from './pages/register/registerPage';
import ProfilePage from './pages/profile/profilePage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
    errorElement: <ErrorPage/>,
    children: [
      {
        path: "/",
        element: <HomePage/>
      },
      {
        path: "/user/login",
        element: <LoginPage/>
      },
      {
        path: "/user/register",
        element: <RegisterPage/>
      },
      {
        path: "/user/profile",
        element: <ProfilePage/>
      }

    ]
  }
  
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

