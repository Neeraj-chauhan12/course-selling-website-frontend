import React from 'react'
import logo from '../../public/profile.jpg'
import { FaFacebook } from "react-icons/fa";
import { IoLogoInstagram } from "react-icons/io5";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

const Home = () => {
  return (
    <>
   <div className='h-screen container bg-gradient-to-r from-black mx-auto  to-blue-950'>
    {/* Navbar */}
    <div className='flex justify-between py-5 px-20 items-center'>

        <div className='flex gap-3 items-center'>
          <img src={logo} className='h-10 w-10 object-cover rounded-full' alt="" />
          <h1 className='text-2xl text-orange-600'>LearnXpress</h1>
        </div>
        <div className='flex gap-3'>
         <button className='text-2xl py-2 px-5 rounded-2xl border-2 border-white text-white'>login</button>
         <button className='text-2xl py-2 px-5 rounded-2xl border-2 border-white text-white'>signup</button>
        </div>

    </div>

   {/* middle part */}
    <div className='flex justify-center items-center flex-col pt-5'>
        <h1 className='text-orange-600 my-3 text-5xl'>LearnExpress</h1>
        <h5 className='text-sm opacity-60 text-white'>Sharpen your skill with courses crafted by experts</h5>
        <div className='flex my-2 gap-5'>
            <button className='px-5 py-1 text-2xl rounded bg-green-500'>Explore Course</button>
            <button className='px-5 py-1 text-2xl rounded bg-white '>Courses Videos</button>
        </div>


    </div>


   {/* course view on the front page */}
    <div>

    </div>

    {/* footer of this page */}

    <div className='flex justify-between py-5 px-20 items-center'>
        <div>
        <div className='flex gap-3 items-center'>
          <img src={logo} className='h-10 w-10 object-cover rounded-full' alt="" />
          <h1 className='text-2xl text-orange-600'>LearnXpress</h1>
        </div>
        <h3 className='text-white my-3'>Follow us</h3>
        <div className='flex text-white gap-2'>
            <FaFacebook />
            <FaGithub />
            <FaLinkedin />
            <IoLogoInstagram />
        </div>
        </div>


        <div className='flex text-white flex-col '>
            <h1 className='text-2xl mb-4'>connects</h1>
            <h3 className='opacity-60'>github-Neeraj-chauhan12</h3>
            <h3 className='opacity-60'>leetcode-Neeraj-chauhan12</h3>
        </div>


        <div className='flex text-white flex-col '>
            <h1 className='text-white text-2xl mb-4'>Copyrights @2025</h1>
            <h3 className='opacity-60'>Terms & Conditions</h3>
            <h3 className='opacity-60'>Privacy Policy  </h3>
        </div>


    </div>
      
    </div>

    </>
  )
}

export default Home
