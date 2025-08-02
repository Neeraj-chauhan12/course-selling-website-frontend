import axios from 'axios'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { BiSolidPurchaseTag } from 'react-icons/bi'
import { CiSearch } from 'react-icons/ci'
import { FaDiscourse } from 'react-icons/fa'
import { IoIosLogOut } from 'react-icons/io'
import { IoHome, IoSettings } from 'react-icons/io5'
import { Link, useNavigate, useParams } from 'react-router-dom'

const Purchases = () => {
  
    const [purchase,setPurchase]=useState([])
    const [isLogged,setIsLogged]=useState(false);
     const [errorMessage, setErrorMessage] = useState(true)
    console.log(purchase)

    
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user?.token; 

    if(!token){
      navigate('/login')
    }

    useEffect(()=>{
      
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
           const response =await axios.get(`http://localhost:3000/user/purchase`,
            {
              headers: {
            Authorization: `Bearer ${token}`,
          },
              withCredentials:true
            }
           )
           
           setPurchase(response.data.courseData)
          
        } catch (error) {
          setErrorMessage("faild to  purchase data",error)
          
        }
      }
      findCourses()
  },[])

    
  async function handleLogout(){

    try {

      const response=await axios.get("http://localhost:3000/user/logout",{
        withCredentials:true
      })
      console.log(response.data.message)
      toast.success(response.data.message)
      localStorage.removeItem("user")
      navigate("/login")
      setIsLogged(false)
      
    } catch (error) {
      console.log("error in logout",error)
      toast.error(error.response.data.error || "logout error")
      
    }

  }

  return (
    <>
<>
    <div className='h-screen w-100vw bg-gradient-to-r from-black to-blue-950 flex'>

      <div className='h-screen w-[15%] border-r-2 pl-5 pr-10 border-white pt-20 text-white'>
        <Link to={'/'} className='flex gap-4 my-2 text-2xl'><IoHome /> <span>Home</span></Link>
        <Link to={'/courses'} className='flex gap-4 my-2 text-2xl'><FaDiscourse /> <span>Courses</span> </Link>
        <Link to={'/purchase'} className='flex gap-4 my-2 text-2xl'><BiSolidPurchaseTag /><span>Purchase</span> </Link>
        <Link to={'/'} className='flex gap-4 my-2 text-2xl'><IoSettings /><span>Setting</span> </Link>
        <Link to={'/'} onClick={handleLogout} className='flex gap-4 my-2 text-red-600 text-2xl'><IoIosLogOut /> <span>LogOut</span></Link>
        
      </div>


      <div className='h-screen w-[85%] '>
        <div className='h-[15%] w-full flex justify-between items-center text-white px-10 py-5 '>
          <h1 className='text-3xl'>My purchases</h1>
          <div className='rounded-3xl border-2 border-white pr-3 flex'><input type="text" className='text-sm p-2 rounded-l-2xl border-r-2 border-white'  placeholder='Type here to search..'/> <h1 className='flex justify-center items-center text-3xl'><CiSearch /></h1> </div>

        </div>

        <div className='course h-[85%] flex flex-wrap gap-16 overflow-y-scroll  py-5 px-10 w-full'>
          {
            errorMessage && (<h1 className='text-sm text-red-600'>{errorMessage}</h1>)
          }


           
          {
            purchase.length<=0?(<h1 className='text-white opacity-80 text-sm'>you have not any course....</h1>):
            purchase.map((courses,index)=>(
              <div className='duration-300  hover:scale-105' key={index}>
                <div className='h-96 mb-5 w-80 rounded bg-gray-800 text-white  '>
                  <img className='h-44 w-80 object-cover' src={courses.image.url} alt="" />
                  <div className='flex justify-center pt-3 gap-3 items-center flex-col'>
                       <h1 className='text-3xl'>{courses.title}</h1>
                       <h1 className='text-sm'>{courses.description}</h1>
                      

                  </div>
               
               
                  
                </div>
              </div>
            ))
          }


        </div>

      </div>

    </div>

    
      
    </>
      
    </>
  )
}

export default Purchases
