import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { Link, useNavigate, useParams } from 'react-router-dom'

const BuyCourse = () => {

  const { courseId } = useParams();
  const [loading, setLoading] = useState(false);
 
  ;



  const user = JSON.parse(localStorage.getItem('user'));
  const token = user?.token;

  const navigate=useNavigate()
        
    
       const handlePurchase = async () => {
        if(!token){
        toast.error("please login to purchase the course")
        return
      }
      try {
        setLoading(true)
        const response = await axios.post(
          `http://localhost:3000/course/purchase/${courseId}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true, // Include cookies if needed
          }
        );
        toast.success(response.data.message || "Course purchsed successfuly")
        navigate("/purchase")
        setLoading(false)
    
      } catch (error) {
        setLoading(false)
        if (error?.response?.status === 400) {
          toast.error("you have already purchased this course");
          navigate("/purchase");
        } else {
          toast.error(error?.response?.data?.error);
        }
      }
    };
    

        
  
       



  return (
    <>
     <div className='h-screen w-screen flex justify-center items-center bg-gradient-to-r from-black to-blue-950'>
         <button onClick={handlePurchase} disabled={loading} 

         className='py-2 px-5 rounded bg-green-500 text-2xl text-white'
         >
          {loading?"proccessing":"Buy now"}</button>
      </div> 
    </>
  )
}

export default BuyCourse
