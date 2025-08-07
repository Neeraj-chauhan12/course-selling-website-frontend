import axios from 'axios'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { Link, useNavigate, useParams } from 'react-router-dom'
import logo from '../../public/profile.jpg'

const AdminDashboard = () => {
   
  
   const [courses,setCourses]=useState([])
   const [loading,setLoading]=useState(true)
   

  const navigate=useNavigate();
  const admin = JSON.parse(localStorage.getItem("admin"));
  const token = admin.token;

  if (!token) {
    toast.error("Please login to admin");
    navigate("/admin/login");
  }

  useEffect(()=>{
      const findCourses=async()=>{
        try {
           const response =await axios.get('http://localhost:3000/course/findCourse',
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


    // delete courses code
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:3000/course/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      console.log(response.data.message)
      toast.success(response.data.message);
      const updatedCourses = courses.filter((course) => course._id !== id);
      setCourses(updatedCourses);
    } catch (error) {
      console.log("Error in deleting course ", error);
      toast.error(error.response.data.errors || "Error in deleting course");
    }
  };

  
  async function handleLogout(){

    try {

      const response=await axios.get("http://localhost:3000/admin/logout",{
        withCredentials:true
      })
      console.log(response.data.message)
      toast.success(response.data.message)
      localStorage.removeItem('admin')
      navigate('/admin/login')
      
      
    } catch (error) {
      console.log("error in logout",error)
      toast.error(error.response.data.error || "logout error")
      
    }

  }
  return (
    <div>
        <div className='h-screen w-100vw bg-gradient-to-r from-black to-blue-950 flex'>

      <div className='h-screen w-[20%] flex gap-4 flex-col border-r-2 pl-5 pr-10 border-white pt-20 text-white'>
        <div className='flex justify-center items-center mb-7 flex-col'>
          <img className='w-18 h-18 rounded-full' src={logo} alt="" />
          <h1 className='text-3xl font-bold '>A'm Admin</h1>
        </div>
        <Link to={'/Admin/Dashboard'} className=' px-5 py-2 border-2 rounded bg-green-500 my-2 text-2xl'> Our courses</Link>
        <Link to={'/admin/create'} className=' px-5 py-2 border-2 rounded my-2 bg-orange-400 text-2xl'> Create course </Link>
        <Link to={'/admin/Dashboard'} className=' px-5 py-2 border-2 rounded my-2 bg-blue-300 text-2xl'>Home </Link>
        <Link  onClick={handleLogout} className='py-2 rounded border-2 px-5 bg-red-500 my-2 text-2xl'>LogOut</Link>
      
        
      </div>


      <div className='h-screen w-[80%] '>
        <div className='h-[10%] px-10 py-7'>
          <h1 className='text-4xl font-bold text-white'>Created Courses</h1>

        </div>

        <div className='course h-[90%] flex flex-wrap gap-16 overflow-y-scroll  py-5 px-10 w-full'>
      
          {
            courses.map((course)=>(
              <div className='  duration-300  hover:scale-105' key={course._id}>
                <div className='h-96 mb-5 w-80 rounded bg-gray-800 text-white  '>
                  <img className='h-44 w-80 object-cover' src={course.image.url} alt="" />
                  <div className='flex justify-center pt-3 gap-3 items-center flex-col'>
                       <h1 className='text-3xl'>{course.title}</h1>
                       <h1 className='text-sm'>{course.description}</h1>
                       <h1 className='text-2xl'>{course.amount}</h1>
                       <div className='flex  gap-18'>
                        <Link to={`/admin/update/${course._id}`} className='bg-orange-600 hover:bg-green-500 py-2 px-4 rounded-full border-2 border-white'>update</Link>
                        <button onClick={()=>handleDelete(course._id)} className='bg-orange-600 hover:bg-green-500 py-2 px-4 rounded-full border-2 border-white'>delete</button>

                       </div>
                       
                       

                  </div>
               
               
                  
                </div>
              </div>
            ))
          }


        </div>

      

    </div>
    </div>

    </div>
  )
}

export default AdminDashboard
