import React from 'react'
import logo from '../../public/profile.jpg'
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';


const Login = () => {

    const {
    register,
    formState: { errors },
  } = useForm();

 function handleSubmit(data){
  console.log(data)

  const userLogin={
    
    email:data.email,
    password:data.password

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
               <Link to={'/signup'} className='text-2xl py-1 px-5 rounded border-2 border-white text-white'>Signup</Link>
               <button className='text-2xl py-1 px-5 rounded bg-orange-600 border-2 border-white text-white'>Join now</button>
              </div>
      
          </div>

           <div className='flex justify-center  items-center'>
            
             
             
        
        <form 
        className='w-96 py-10 mt-14 rounded bg-gray-900 px-5 '
        onSubmit={handleSubmit()}>
           
           <div className='flex justify-center text-white mb-8 items-center flex-col'>
                <h1 className='text-3xl '>Welcome to <span className='text-orange-600'>LearnXpress</span></h1>
                <h3>Log in to access paid content!</h3>
              </div>
            
            <h1 className='text-white text-2xl mb-2'>Email</h1>
            <input
            
                className='w-full mb-5 text-2xl text-white border-2 border-gray-600 rounded '
               placeholder='Enter the email..' 
               type="email"
               {...register('email')}
                />

               <h1 className='text-2xl mb-2 text-white'>Password</h1>
                <input 
                
                 className='w-full mb-5 text-2xl text-white border-2 border-gray-600 rounded '
                placeholder='Enter the password..'
                type='password' 
                {...register('password')}
                />

                <button className='bg-orange-600 rounded w-full py-3 flex justify-center items-center' >submit now</button>

        </form>
             
             

            </div>
         
          </div>

    
      
    </>
  )
}

export default Login
