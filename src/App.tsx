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
import Cars from './dashboard/AdminDasboard/cars/Cars'
import Users from './dashboard/AdminDasboard/manageUsers/Users'
import Bookings from './dashboard/AdminDasboard/bookings/Bookings'
import Profile from './dashboard/Profile'
import UserDashboard from './dashboard/UserDashboard/UserDashboard'
import { useSelector } from 'react-redux'
import type { RootState } from './app/store'
import UserBookings from './dashboard/UserDashboard/bookings/UserBookings'
import Payments from './dashboard/AdminDasboard/payments/Payments'
import UserPayment from './dashboard/UserDashboard/payments/UserPayment'



function App() {
  const isAdmin = useSelector((state: RootState) => state.user.customer?.role === 'admin');
  const isUser = useSelector((state: RootState) => state.user.customer?.role === 'user');
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
      element: isAdmin ? <AdminDashboard /> : <Login />,
      children: [
       
         {
          path: 'cars',
          element: <Cars />
        },
         {
          path: 'users',
          element: <Users/>
        },
         {
          path: 'bookings',
          element: <Bookings/>
        },
          {
          path: 'payments',
          element: <Payments/>
        },
         {
          path: 'profile',
          element: <Profile/>
        },
        {
          path: 'analytics',
          element: <Welcome />
        },
      ]
    },
    {
      path: '*',
      element: <Error />
    },

    {
      path: 'user/dashboard',
       element: isUser ? <UserDashboard /> : <Login />,
      children: [
         {
          path: 'bookings',
          element: <UserBookings/>
        },
          {
          path: 'payments',
          element: <UserPayment/>
        },
         {
          path: 'profile',
          element: <Profile/>
        },
        {
          path: 'analytics',
          element: <Welcome />
        },
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