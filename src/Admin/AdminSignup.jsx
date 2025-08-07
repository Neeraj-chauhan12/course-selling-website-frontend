import React, { useState } from 'react'
import logo from '../../public/profile.jpg'
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const AdminSignup = () => {

  const [errorResponse,setErrorResponse]=useState("")

  const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm();
   
    const navigate=useNavigate();

  async function onsubmit(data){
    console.log(data)

    const adminData={
      adminname:data.adminname,
      email:data.email,
      password:data.password
    }
 
    try {
      
     const response= await axios.post("http://localhost:3000/admin/register",adminData,
      {
        withCredentials:true,

      }
     )
     toast.success("signup successfull",response)
     navigate('/Admin/Login')

      
    } catch (error) {
      if(error.response){
      setErrorResponse(error.response.data.error)
      console.log("error in signup page",error)
      }
      
      
    }
    
     
  }

  return (
     <>
    
        <div className='h-screen w-screen bg-gradient-to-r from-black to-blue-950'>
            <div className='flex justify-between py-5 px-20 items-center'>
          
                  <div className='flex gap-3 items-center'>
                    <img src={logo} className='h-10 w-10 object-cover rounded-full' alt="" />
                    <h1 className='text-2xl text-orange-600'>LearnXpress</h1>
                  </div>
                  <div className='flex gap-3'>
                   <Link to={'/Admin/Login'} className='text-2xl py-1 px-5 rounded border-2 border-white text-white'>Login</Link>
                   <button className='text-2xl py-1 px-5 rounded bg-orange-600 border-2 border-white text-white'>Join now</button>
                  </div>
          
              </div>
    
               <div className='flex justify-center  items-center'>
                
                 
                 
            
            <form 
            className='w-96 py-10 mt-14 rounded bg-gray-900 px-5 '
            onSubmit={handleSubmit(onsubmit)}>
               
               <div className='flex justify-center text-white mb-8 items-center flex-col'>
                    <h1 className='text-3xl '>Welcome to <span className='text-orange-600'>LearnXpress</span></h1>
                    <h3>Just Admin Signup To Join Us!</h3>
                  </div>
                
                <h1 className='text-white text-2xl mb-2'>Username</h1>
                <input
                
                    className='w-full mb-5 text-2xl text-white border-2 focus:outline-none focus:ring-2 focus:ring-green-500 border-gray-600 rounded '
                   placeholder='Enter the username..' 
                   type="text"
                   {...register('adminname')}
                    />

                <h1 className='text-white text-2xl mb-2'>Email</h1>
                <input
                
                    className='w-full mb-5 text-2xl text-white border-2 focus:outline-none focus:ring-2 focus:ring-green-500 border-gray-600 rounded '
                   placeholder='Enter the email..' 
                   type="email"
                   {...register('email')}
                    />
    
                   <h1 className='text-2xl mb-2 text-white'>Password</h1>
                    <input 
                    
                     className='w-full mb-5 text-2xl text-white border-2 focus:outline-none focus:ring-2 focus:ring-green-500 border-gray-600 rounded '
                    placeholder='Enter the password..'
                    type='password' 
                    {...register('password')}
                    />

                    {errorResponse &&(
                      <h1 className='text-sm text-red-500 text-center'>
                        {errorResponse}
                      </h1>)
                    }
    
                    <button className='bg-orange-600 rounded mt-4  w-full py-3 flex justify-center items-center' >submit now</button>
    
            </form>
                 
                 
    
                </div>
             
              </div>
    
        
          
        </>
  )
}

export default AdminSignup
