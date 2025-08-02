import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import Signup from './components/Signup'
import toast, { Toaster } from 'react-hot-toast';
import BuyCourse from './components/BuyCourse'
import Purchases from './components/Purchases'
import Courses from './components/Courses'


const App = () => {
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

      </Routes>
      <Toaster />
    </div>
      
    </>
  )
}

export default App
