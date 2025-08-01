import React, { useEffect, useState } from 'react'
import logo from '../../public/profile.jpg'
import { FaFacebook } from "react-icons/fa";
import { IoLogoInstagram } from "react-icons/io5";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import axios, { Axios }  from 'axios'
import Slider from "react-slick";
 import "slick-carousel/slick/slick.css";
 import "slick-carousel/slick/slick-theme.css";
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Home = () => {

  const [courses,setCourses]=useState([])
  const [isLogged,setIsLogged]=useState(false);

  const navigate=useNavigate()

  useEffect(()=>{
    const token=localStorage.getItem("user")

    if(token){
      setIsLogged(true)
    }
    else{
      setIsLogged(false)
    }
  },[])

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
        //localStorage.getItem("user",JSON.stringify(response.data.token))
          
        } catch (error) {
          console.log("error in findcourse",error)
          
        }
      }
      findCourses()
  },[]);


  async function handleLogout(){

    try {

      const response=await axios.get("http://localhost:3000/user/logout",{
        withCredentials:true
      })
      console.log(response.data.message)
      toast.success(response.data.message)
      setIsLogged(false)
      
    } catch (error) {
      console.log("error in logout",error)
      toast.error(error.response.data.error || "logout error")
      
    }

  }

  
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay:true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  
   
  
  return (
    <>
   <div className='h-screen container bg-gradient-to-r from-black mx-auto  to-blue-950'>
    {/* Navbar */}
    
    {
      isLogged? <div className='flex justify-between py-5 px-20 items-center'>

        <div className='flex gap-3 items-center'>
          <img src={logo} className='h-10 w-10 object-cover rounded-full' alt="" />
          <h1 className='text-2xl text-orange-600'>LearnXpress</h1>
        </div>
        <div className='flex gap-3'>

         <Link onClick={handleLogout}  className='text-2xl py-1 px-5 rounded border-2 border-white text-white'>logout</Link>
    
        </div>

        </div>

        :
        
         <div className='flex justify-between py-5 px-20 items-center'>

        <div className='flex gap-3 items-center'>
          <img src={logo} className='h-10 w-10 object-cover rounded-full' alt="" />
          <h1 className='text-2xl text-orange-600'>LearnXpress</h1>
        </div>
        <div className='flex gap-3'>
          
         <Link to={'/login'} className='text-2xl py-1 px-5 rounded border-2 border-white text-white'>login</Link>
         <Link to={'/signup'} className='text-2xl py-1 px-5 rounded  border-2 border-white text-white'>signup</Link>
    
        </div>

    </div>

    
    }

  

   {/* middle part */}
    <div className='flex justify-center items-center flex-col pt-5'>
        <h1 className='text-orange-600 my-3 text-5xl'>LearnExpress</h1>
        <h5 className='text-sm opacity-60 text-white'>Sharpen your skill with courses crafted by experts</h5>
        <div className='flex my-2 gap-5'>
            <button className='px-5 py-1 text-2xl text-white rounded bg-green-500 hover:bg-white hover:text-black'>Explore Course</button>
            <button className='px-5 py-1 text-2xl rounded bg-white text-black hover:bg-green-500 hover:text-white '>Courses Videos</button>
        </div>


    </div>


   {/* course view on the front page */}
    <div className='px-20 py-10 ' >

       <Slider {...settings}> 
        
          {
            courses.map((course)=>(
              <div className='relative flex-shrink-0 transition-transform duration-300 transform hover:scale-105' key={course._id}>
                <div className='h-60 w-80 bg-gray-900 text-white  '>
                  <img className='h-32 w-80 object-cover' src={course.image.url} alt="" />
                  <div className='flex justify-center pt-3 gap-3 items-center flex-col'>
                       <h1 className='text-3xl'>{course.title}</h1>
                       <button className='bg-orange-600 hover:bg-green-500 py-2 px-4 rounded-full border-2 border-white'>Enroll now</button>

                  </div>
               
               
                  
                </div>
              </div>
            ))
          }

      
       </Slider> 

    </div>

    {/* footer of this page */}

    <div className='flex justify-between py-4 px-20 items-center'>
        <div>
        <div className='flex gap-3 items-center'>
          <img src={logo} className='h-10 w-10 object-cover rounded-full' alt="" />
          <h1 className='text-2xl text-orange-600'>LearnXpress</h1>
        </div>
        <h3 className='text-white my-3'>Follow us</h3>
        <div className='flex text-white gap-2'>
            <FaFacebook className='hover:bg-blue-600 rounded-2xl' />
            <FaGithub  />
            <FaLinkedin className='hover:bg-blue-500 rounded-2xl' />
            <IoLogoInstagram className='hover:bg-pink-600  rounded-2xl' />
        </div>
        </div>


        <div className='flex text-white flex-col '>
            <h1 className='text-2xl mb-4'>Connects</h1>
            <h3 className='opacity-60'>github-Neeraj-chauhan12</h3>
            <h3 className='opacity-60'>leetcode-Neeraj-chauhan12</h3>
            <h3 className='opacity-60'>LinkedIn-Neeraj-chauhan12</h3>
        </div>


        <div className='flex text-white flex-col '>
            <h1 className='text-white text-2xl mb-4'>Copyrights @2025</h1>
            <h3 className='opacity-60'>Terms & Conditions</h3>
            <h3 className='opacity-60'>Privacy Policy  </h3>
            <h3 className='opacity-60'>Refund & Cancellation</h3>
        </div>


    </div>
      
    </div>

    </>
  )
}

export default Home
