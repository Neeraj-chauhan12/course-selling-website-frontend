import React, { useEffect, useState } from 'react'
import { IoHome } from "react-icons/io5";
import { FaDiscourse } from "react-icons/fa";
import { BiSolidPurchaseTag } from "react-icons/bi";
import { IoSettings } from "react-icons/io5";
import { IoIosLogOut } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { BACKEND_URL } from '../utils/utils';



const Courses = () => {

  const [courses,setCourses]=useState([])
  const [isLogged,setIsLogged]=useState(false);
  const [loading,setLoading]=useState(true)
  
  

  const navigate=useNavigate();
  
    

  useEffect(()=>{
    const user=localStorage.getItem("user")
      if(user){
        setIsLogged(true)
      }
      else{
        setIsLogged(false)
      }
    },[])


  useEffect(()=>{
      const findCourses=async()=>{
        try {
           const response =await axios.get(`${BACKEND_URL}/course/findCourse`,
            {
              withCredentials:true
            }
           )
        console.log(response.data.allCourse)
        setCourses(response.data.allCourse)
        setLoading(false)
          
        } catch (error) {
          console.log("error in findcourse",error)
          
        }
      }
      findCourses()
  },[]);


  async function handleLogout(){

    try {

      const response=await axios.get(`${BACKEND_URL}/user/logout`,{
        withCredentials:true
      })
      console.log(response.data.message)
      toast.success(response.data.message)
      localStorage.removeItem('user')
      setIsLogged(false)
      navigate('/')
      
      
    } catch (error) {
      console.log("error in logout",error)
      toast.error(error.response.data.error || "logout error")
      
    }

  }




  return (
    <>
    <div className='h-screen w-100vw bg-gradient-to-r from-black to-blue-950 flex'>

      <div className='h-screen w-[15%] border-r-2 pl-5 pr-10 border-white pt-20 text-white'>
        <Link to={'/'} className='flex gap-4 my-2 text-2xl'><IoHome /> <span>Home</span></Link>
        <Link to={'/courses'} className='flex gap-4 my-2 text-2xl'><FaDiscourse /> <span>Courses</span> </Link>
        <Link to={'/purchase'} className='flex gap-4 my-2 text-2xl'><BiSolidPurchaseTag /><span>Purchase</span> </Link>
        <Link to={'/'} className='flex gap-4 my-2 text-2xl'><IoSettings /><span>Setting</span> </Link>

        <Link  onClick={handleLogout} className='flex gap-4 my-2 text-2xl'><IoIosLogOut /> <span>LogOut</span></Link>
      
        
      </div>


      <div className='h-screen w-[85%] '>
        <div className='h-[15%] w-full flex justify-between items-center text-white px-10 py-5 '>
          <h1 className='text-3xl'>Courses</h1>
          <div className='rounded-3xl border-2 border-white pr-3 flex'><input type="text" className='text-sm p-2 rounded-l-2xl border-r-2 border-white'  placeholder='Type here to search..'/> <h1 className='flex justify-center items-center text-3xl'><CiSearch /></h1> </div>

        </div>

        <div className='course h-[85%] flex flex-wrap gap-16 overflow-y-scroll  py-5 px-10 w-full'>
      
          {
            courses.map((course)=>(
              <div className='  duration-300  hover:scale-105' key={course._id}>
                <div className='h-96 mb-5 w-80 rounded bg-gray-800 text-white  '>
                  <img className='h-44 w-80 object-cover' src={course.image.url} alt="" />
                  <div className='flex justify-center pt-3 gap-3 items-center flex-col'>
                       <h1 className='text-3xl'>{course.title}</h1>
                       <h1 className='text-sm'>{course.description}</h1>
                       <h1 className='text-2xl'>{course.amount}</h1>
                       <Link  to={`/buy/${course._id}`} className='bg-orange-600 hover:bg-green-500 py-2 px-4 rounded-full border-2 border-white'>Buy now</Link>

                  </div>
               
               
                  
                </div>
              </div>
            ))
          }


        </div>

      

    </div>
    </div>

    
      
    </>
  )
}

export default Courses
