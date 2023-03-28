import React from 'react'
import { Link } from 'react-router-dom'
import { CheckBadgeIcon } from '@heroicons/react/24/outline'

const OrderSuccess = () => {
    return (
        <div className='flex flex-col mt-28 max-w-xl mx-auto'>
            <div className='mx-auto '>
                <CheckBadgeIcon className='h-24 w-24 text-indigo-600' />
            </div>
            <div className='text-center my-4 text-3xl '>
                <p>
                    Your Order has been Placed Successfully
                </p>
            </div>

            <Link to="/orders">
                <div className='mt-6 mb-4 w-2/5 p-2 mx-auto bg-indigo-600 text-white text-center hover:bg-indigo-500 rounded-lg'>View Orders</div>
            </Link>

            <Link to="/products">
                <div className=' p-2 w-2/5 mx-auto bg-indigo-600 text-white text-center hover:bg-indigo-500 rounded-lg'>Continue Shopping</div>
            </Link>

        </div>
    )
}

export default OrderSuccess