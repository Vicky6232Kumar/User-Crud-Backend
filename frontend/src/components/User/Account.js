import React from 'react'
import { Link } from "react-router-dom";
import { PencilSquareIcon } from '@heroicons/react/20/solid'

const Account = ({ user }) => {
  return (
    <div className=' my-24 flex justify-center'>

      <div className='mr-20'>
        <div className='hover:scale-110 transition-all' >
          <img src={user.avatar.url} className="rounded-full" alt={user.name} />

        </div>
        <div className=' w-4 h-4 mx-auto mt-4 hover:text-indigo-400'>
          <Link to="/account/update" ><PencilSquareIcon  className=''/></Link>
        </div>
      </div>

      <div className='my-4 w-[20rem] '>
        <div className='mb-10'>
          <p className='text-xl mb-2'>Full Name  </p>
          <p className='text-base tracking-tight  text-gray-500'>{user.username}</p>
        </div>

        <div className='mb-10'>
          <p className='text-xl mb-2'>Email  </p>
          <p className='text-base tracking-tight  text-gray-500'>{user.email}</p>
        </div>

        <div className='mb-10'>
          <p className='text-xl mb-2'>Joined On  </p>
          <p className='text-base tracking-tight  text-gray-500'>{String(user.createdAt).substring(0,10)}</p>
        </div>

        <Link to="">
          <div className='mb-6 p-2 bg-indigo-600 text-white text-center hover:bg-indigo-500 rounded-lg'>My Orders</div>
        </Link>

        <Link to="/password/update">
          <div className=' p-2 bg-indigo-600 text-white text-center hover:bg-indigo-500 rounded-lg'>Update Password</div>
        </Link>



      </div>
    </div>
  )
}

export default Account