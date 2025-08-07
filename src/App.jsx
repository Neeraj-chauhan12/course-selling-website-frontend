import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import Signup from './components/Signup'
import toast, { Toaster } from 'react-hot-toast';
import BuyCourse from './components/BuyCourse'
import Purchases from './components/Purchases'
import Courses from './components/Courses'
import AdminSignup from './Admin/AdminSignup'
import AdminLogin from './Admin/AdminLogin'
import AdminDashboard from './Admin/AdminDashboard'
import AdminCreate from './Admin/CreateCourse'
import AdminUpdate from './Admin/UpdateCourse'
import AdminDeleteCourse from './Admin/AdminDeleteCourse'


const App = () => {

  const user=localStorage.getItem("user");
  const admin=localStorage.getItem("admin")
  return (
    <>
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />


        <Route path='/buy/:courseId' element={<BuyCourse />} />
        <Route path='/purchase' element={<Purchases />} />
        <Route path='/courses' element={<Courses />} />

        {/* Admin routes */}

        
        <Route path='/Admin/Signup' element={<AdminSignup />} />
        <Route path='/Admin/Login' element={<AdminLogin />} />
        <Route path='/Admin/Dashboard' element={<AdminDashboard />} />
        <Route path='/Admin/Create' element={<AdminCreate />} />
        <Route path='/Admin/Update/:id' element={<AdminUpdate />} />

      </Routes>
      <Toaster />
    </div>
      
    </>
  )
}

export default App
