import React from 'react'

const Dashboard = () => {
  return (
    <div className=''>
      <div className='flex  '>
        <div className='p-4 m-2 rounded-lg bg-red-400 w-1/2'>Amount Earned</div>
        <div className='p-4 m-2 rounded-lg bg-purple-400 w-1/2'>User</div>
      </div>
      <div className='flex '>
        <div className='p-4 m-2 rounded-lg bg-yellow-300 w-1/2'>Product Sold</div>
        <div className='p-4 m-2 text-white rounded-lg bg-black w-1/2'>Orders</div>
      </div>
    </div>
  )
}

export default Dashboard