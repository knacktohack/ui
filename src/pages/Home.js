import React from 'react';
import { Link } from 'react-router-dom';
import logoMoto from './../assets/logo-motto.png';

const Home = () => {
  return (
    <div className='h-screen w-4/12 flex flex-col justify-center items-center gap-10 mx-auto'>
        <div className='flex flex-col justify-start items-center gap-4 p-10'>
        <img  src={logoMoto} alt="Example" />
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
