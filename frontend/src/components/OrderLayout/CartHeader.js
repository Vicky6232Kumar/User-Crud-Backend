import React from 'react'
import {Link } from 'react-router-dom'
const CartHeader = ({order}) => {
  return (
    
    
    <div className='flex  justify-between text-sm'>
      <div className='flex '>
        <div className='p-2 mx-2 font-semibold'>
          <p>Order number</p>
          <p className='text-gray-500 font-normal mt-2' >{order._id }</p>
        </div>
        <div className='p-2 mx-4 font-semibold'>
          <p> Date placed</p>
          <p className='text-gray-500 font-normal mt-2'>{String(order.createdAt).substring(0,10)}</p>
        </div>
        <div className='p-2 mx-2 font-semibold'>
          <p>Total amount</p>
          <p className='mt-2'>₹{order.itemsPrice}</p>
        </div>

      </div>

      <div className='flex'>
        <Link to={`/order/${order._id}`} className='p-2  m-3 rounded-md font-semibold border bg-white border-gray-300'>View Order</Link>
        <button className='p-2 m-3 rounded-md  font-semibold border bg-white border-gray-300'>View Invoice</button>
      </div>

    


    
  </div>
  )
}

export default CartHeader