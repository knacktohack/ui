import React from 'react'
import { Link } from 'react-router-dom'

const ChatSidebar = () => {
  return (
    <div className='h-full w-1/5 border border-green-primary bg-green-primary flex flex-col gap-10 p-4 text-white tracking-wide'>
        <div className='w-full flex flex-row justify-center items-center bg-orange-primary rounded-md p-2'>
            adnan.khurshid@company.com
        </div>

        <div className='flex flex-col gap-2'>
            <div className='text-lg font-medium tracking-wider'>Previous Sessions</div>
            <Link className='w-full p-2 border-2 pointer border-orange-primary hover:bg-orange-primary rounded-md transition duration-150 ease-in-out  bg-orange-primary'>
                Insider trading 
            </Link>
            <Link className='w-full p-2 border-2 border-orange-primary hover:bg-orange-primary  rounded-md transition duration-150 ease-in-out'>
                Bypass tracking
            </Link>
            <Link className='w-full p-2 border-2 border-orange-primary hover:bg-orange-primary rounded-md transition duration-150 ease-in-out'>
                .NET issue 
            </Link>
            <Link className='w-full p-2 border-2 border-orange-primary hover:bg-orange-primary rounded-md transition duration-150 ease-in-out'>
                Angular ejs grids 
            </Link>
        </div>

    </div>
  )
}

export default ChatSidebar
