import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateCourse = () => {

   const id=useParams()

    
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(true);
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



    useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const { data } = await axios.get(`http://localhost:3000/course/${id}`, {
          withCredentials: true,
        });
        console.log(data);
        setTitle(data.course.title);
        setDescription(data.course.description);
        setAmount(data.course.amount);
        setImage(data.course.image.url);
        setImagePreview(data.course.image.url);
        setLoading(false);
      } catch (error) {
        console.log(error);
        toast.error("Failed to fetch course data");
        setLoading(false);
      }
    };
    fetchCourseData();
  }, [id]);

    const handleUpdateCourse = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", amount);
    if (image) {
      formData.append("imageUrl", image);
    }
    const admin = JSON.parse(localStorage.getItem("admin"));
    const token = admin.token;
    if (!token) {
      toast.error("Please login to admin");
      return;
    }
    try {
      const response = await axios.put(
        `http://localhost:3000/course/update/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      toast.success(response.data.message || "Course updated successfully22");
      navigate("/admin/dashboard"); // Redirect to courses page after update
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.errors);
    }
  };

  if (loading) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }




  return (
    <>
        <div className='h-screen w-screen bg-gradient-to-r from-black to-blue-950 justify-center flex flex-col items-center'>
          
                  <form 
            className='w-[60%] py-10  rounded bg-gray-900 px-5 '
            onSubmit={handleUpdateCourse}> 
               <div className='flex justify-center text-white mb-8 items-center flex-col'>
                    <h3 className='text-3xl'>Update course</h3>
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
    
                    <button type='submit' className='bg-orange-600 rounded mt-4  w-full py-3 flex justify-center items-center' >Create course</button>
    
            </form>

    </div>
    
      
    </>
  )
}

export default UpdateCourse
