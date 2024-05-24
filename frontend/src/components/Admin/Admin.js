import React from 'react'
import {
  Routes,
  Route
} from 'react-router-dom'
import AdminNavbar from './AdminNavbar'
import Dashboard from './Dashboard'
import Users from './Users'
import Products from './Products'
import Orders from './Orders'
import Reviews from './Reviews'

const Admin = () => {


  return (
    <div className='flex  '>
      <AdminNavbar />
      
      {/* right */}
      <div className=' w-full h-full m-16'>
      <Routes>
        <Route excat path="/dashboard" element={<Dashboard />} />
        <Route excat path="/users" element={<Users />} />
        <Route excat path="/products" element={<Products />} />
        <Route excat path="/orders" element={<Orders />} />
        <Route excat path="/reviews" element={<Reviews />} />
      </Routes>
      </div>
    </div>


  )
}



export default Admin