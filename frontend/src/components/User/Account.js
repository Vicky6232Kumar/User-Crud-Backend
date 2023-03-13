import React from 'react'
import { Link } from "react-router-dom";

const Account = ({user}) => {
  return (
    <div className='w-fit mx-auto my-24'>
      <div className='mx-auto w-fit  rounded-full' >
        <img src={user.avatar.url} alt={user.name} />
        
      </div>
      <div className='text-md text-center'>
      <Link to="/account/update" >Edit Profile</Link>
      </div>
      
      <div className=' text-xl my-4 text-center'>
        <div>
          <span>Full Name : </span>
          <span className='text-blue-500'>{user.username}</span>
        </div>
        <div>
          <span>Email : </span>
          <span className='text-blue-500'>{user.email}</span>
        </div>

        

          <Link to ="/password/update">
            <div className='m-4 p-2 bg-indigo-600 text-white '>Change Password</div>
          </Link>
       
        
        
      </div>
    </div>
  )
}

export default Account