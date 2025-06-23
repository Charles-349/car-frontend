import { createBrowserRouter, RouterProvider } from 'react-router'
import './App.css'

import LandingPage from './pages/LandingPage'
import Register from './pages/Register'
import Login from './pages/Login'
import AboutPage from './pages/AboutPage'

import AdminDashboard from './dashboard/AdminDasboard/AdminDashboard'
import Error from './components/error/Error'
import ServicesPage from './pages/ServicesPage'
import VerifyUser from './pages/VerifyUser'
import Welcome from './dashboard/Welcome'
import { Toaster } from 'sonner'



function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <LandingPage />,
    },
    {
      path: '/about',
      element: <AboutPage />
    },
    {
      path: '/register',
      element: <Register />
    },
    {
      path: '/register/verify',
      element: <VerifyUser />
    },
    {
      path: '/login',
      element: <Login />
    },
     {
      path: '/services',
      element: <ServicesPage/>
    },
    {
      path: 'admin/dashboard',
      element: <AdminDashboard />,
      children: [
       
         {
          path: 'cars',
          element: <h1> Analytics </h1>
        },
         {
          path: 'users',
          element: <h1> Analytics </h1>
        },
         {
          path: 'profile',
          element: <h1> Analytics </h1>
        },
        {
          path: 'analytics',
          element: <Welcome />
        },
        
        // {
        //   path: 'profile',
        //   element: <h1>Analytics</h1>
        // }
      ]
    },
    {
      path: '*',
      element: <Error />
    }
  ])

  return (
    <>
      <RouterProvider router={router} />
      <Toaster position='top-right' toastOptions={{
        classNames: {
          error: 'bg-red-500 text-white',
          success: 'bg-green-500 text-white',
          info: 'bg-blue-500 text-white',
        }

      }} />
    </>
  )
}

export default App