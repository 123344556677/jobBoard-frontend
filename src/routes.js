import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import Layout from './front-end/Layout';
import SimpleLayout from './layouts/simple';
//
import Home from './front-end/Home';
import Creatives from './front-end/Creatives';
import Jobs from './front-end/Jobs';
import Projects from './front-end/Projects';
import Register from './front-end/Register';
import Login from './front-end/Login';
import ForgetPassword from './front-end/ForgetPassword';
import ResetPassword from './front-end/ResetPassword';
import VerifyEmail from './front-end/VerifyEmail';
//
import BlogPage from './pages/BlogPage';
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import ProductsPage from './pages/ProductsPage';
import DashboardAppPage from './pages/DashboardAppPage';

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: '/',
      element: <Layout />,
      children: [
        { path: '/', element: <Home />, index: true },
        { path: 'jobs', element: <Jobs /> },
        { path: 'projects', element: <Projects /> },
        { path: 'creatives', element: <Creatives /> },
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: 'forgot-password', element: <ForgetPassword /> },
        { path: 'reset-password', element: <ResetPassword /> },
        { path: 'verify-email', element: <VerifyEmail /> },
      ],
    },
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'user', element: <UserPage /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'blog', element: <BlogPage /> },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
