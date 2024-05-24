import React from 'react'
import { Squares2X2Icon, UsersIcon, BriefcaseIcon, ClipboardDocumentListIcon, CircleStackIcon } from '@heroicons/react/24/outline'
import {Link, useLocation} from 'react-router-dom'


const AdminNavbar = () => {

    const location =useLocation();

  return (
    
    <div className='w-1/6 mt-12 '>
        <Link to="/admin/dashboard" className={`${location.pathname === "/admin/dashboard" && ["border-r-4 rounded-r-xl border-blue-500"]} flex items-center p-5 m-5 mr-0`} >
          <div className='mr-3'><Squares2X2Icon className='w-8 h-8'/></div>
          <p className='text-lg text-gray-500 ' > DashBoard</p>
        </Link>
        <Link to="/admin/users" className={`${location.pathname === "/admin/users" && ["border-r-4 rounded-r-xl border-blue-500"]} flex items-center p-5 m-5 mr-0`}>
          <div className='mr-3'><UsersIcon className='w-8 h-8'/></div>
          <p className='text-lg text-gray-500 ' >Users</p>
        </Link>
        <Link to="/admin/products" className={`${location.pathname === "/admin/products" && ["border-r-4 rounded-r-xl border-blue-500"]} flex items-center p-5 m-5 mr-0`}>
          <div className='mr-3'><BriefcaseIcon className='w-8 h-8'/></div>
          <p className='text-lg text-gray-500 ' > Products</p>
        </Link>
        <Link to= "/admin/orders" className={`${location.pathname === "/admin/orders" && ["border-r-4 rounded-r-xl border-blue-500"]} flex items-center p-5 m-5 mr-0`}>
          <div className='mr-3'><CircleStackIcon className='w-8 h-8'/></div>
          <p className='text-lg text-gray-500 ' > Orders</p>
        </Link>
        <Link to="/admin/reviews" className={`${location.pathname === "/admin/reviews" && ["border-r-4 rounded-r-xl border-blue-500"]} flex items-center p-5 m-5 mr-0`}>
          <div className='mr-3'><ClipboardDocumentListIcon className='w-8 h-8'/></div>
          <p className='text-lg text-gray-500 ' > Reviews</p>
        </Link>

      </div>
  )
}

export default AdminNavbar