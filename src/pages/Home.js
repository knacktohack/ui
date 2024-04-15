import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className='h-screen w-4/12 flex flex-col justify-center items-center gap-10 mx-auto'>
        <div className='flex flex-col justify-start items-center gap-4 p-10'>
           <div className='text-4xl font-semibold text-orange-primary'>
           Mojo-GPT
            </div> 
            <div className='text-xl text-neutral-700 font-semibold'>The safest LLM for your organisation</div>
        </div>
      <Link to={'/chat'} className='text-4xl text-white font-bold bg-green-primary p-10 rounded-md w-full text-center'>
            Chat
      </Link>
      <Link to={'/admin'} className='text-4xl text-white font-bold bg-orange-primary p-10 rounded-md w-full text-center'>
            Admin Panel
      </Link>
    </div>
  )
}

export default Home
