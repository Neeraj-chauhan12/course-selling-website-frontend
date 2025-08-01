import React from 'react'
import { Link, useParams } from 'react-router-dom'

const BuyCourse = () => {

  const courseId=useParams()

  return (
    <>
     <div className='h-screen w-screen flex justify-center items-center bg-gradient-to-r from-black to-blue-950'>
         <Link to={`/purchase/${courseId}`} className='py-2 px-5 rounded bg-green-500 text-2xl text-white'>buy</Link>
      </div> 
    </>
  )
}

export default BuyCourse
