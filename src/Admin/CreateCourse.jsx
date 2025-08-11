import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast';
import { BACKEND_URL } from '../utils/utils';


const CreateCourse = () => {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState("");


      const navigate=useNavigate()
   
      const changePhotoHandler = (e) => {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
      setImagePreview(reader.result);
      setImage(file);
    };
  };


  
  
      const handleCreateCourse=async(e)=>{
        e.preventDefault();
        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("amount", amount);
        formData.append("image", image);

     const admin = JSON.parse(localStorage.getItem("admin"));
    const token = admin.token;
    if (!token) {
      navigate("/admin/login");
      return;
    }

        
 
   try {
      const response = await axios.post(`${BACKEND_URL}/course/create`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      console.log(response.data);
      toast.success(response.data.message || "Course created successfully");
      navigate("/admin/dashboard");
      setTitle("");
      setAmount("");
      setImage("");
      setDescription("");
      setImagePreview("");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.errors);
    }
      }

      

  return (
    <>
    <div className='h-screen w-screen bg-gradient-to-r from-black to-blue-950 flex-col justify-center flex items-center'>
      
        <form 
            className='w-[60%] py-10  rounded bg-gray-900 px-5 '
            onSubmit={handleCreateCourse}> 
               <div className='flex justify-center text-white mb-8 items-center flex-col'>
                    <h3 className='text-3xl'>Create course</h3>
                  </div>
                
                <h1 className='text-white text-2xl mb-2'>Title</h1>

                <input
                   className='w-full mb-5 text-2xl text-white  px-3 py-2  border-2 focus:outline-none focus:ring-2 focus:ring-green-500 border-gray-600 rounded '
                   placeholder='Title...' 
                   type="text"
                   value={title}
                   onChange={(e)=>setTitle(e.target.value)}
              
                    />

                <h1 className='text-white text-2xl mb-2'>Description</h1>
               
                <input
                
                   className='w-full mb-5 text-2xl text-white border-2  px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 border-gray-600 rounded '
                   placeholder='Description....' 
                   type="text"
                   value={description}
                   onChange={(e)=>setDescription(e.target.value)}
                    />
    
                   <h1 className='text-2xl mb-2 text-white'>Amount</h1>

                    <input 
                    className='w-full mb-5 text-2xl text-white border-2  px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 border-gray-600 rounded '
                    placeholder='Amount....'
                    type='number' 
                    value={amount}
                   onChange={(e)=>setAmount(e.target.value)}
                  
                    />

                    <div className='text-white'>
                      <h1 className='text-3xl '>Your image</h1>
                      <img
                  src={imagePreview ? `${imagePreview}` : "/imgPL.webp"}
                  alt="Image.."
                  className="w-full max-w-sm h-auto rounded-md object-cover"
                />

                    </div>

                    <input 
                   className='w-full mb-5 text-2xl text-white border-2 px-3 py-2  focus:outline-none focus:ring-2 focus:ring-green-500 border-gray-600 rounded '
                    type="file" 
                    onChange={changePhotoHandler}
                    name=""/>
    
                    <button  className='bg-orange-600 rounded mt-4  w-full py-3 flex justify-center items-center' >Create course</button>
    
            </form>

    </div>
    


      
    </>
  )
}

export default CreateCourse
