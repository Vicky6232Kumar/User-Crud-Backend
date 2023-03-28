import React from 'react'
import { CheckCircleIcon , ClockIcon } from '@heroicons/react/24/solid'
import { Link } from 'react-router-dom'  

const OrderList = ({ product, orderStatus }) => {

    // // const id = useParams();
    return (
        <div className='mt-6 pb-4'>


            <div className='flex  '>
                <div className="h-28 w-28 mr-4 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                    <img
                        src="https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg"
                        alt="img"
                        className="h-full w-full object-cover object-center "
                    />
                </div>
                <div className='mx-4'>
                    <div className='flex justify-between font-semibold  '>
                        <p>{product.name}</p>
                        <p>₹{product.price}</p>
                    </div>
                    <div className='text-gray-500 w-4/5'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt molestiae obcaecati quasi quis quo autem accusamus veniam quaerat dolorum corrupti!
                    </div>
                </div>
            </div>

            <div className='flex justify-between mt-4 text-md text-gray-500'>

                <div className='flex '>
                    {orderStatus==="Processing" ? <ClockIcon className='text-indigo-700 w-6 h-6 mr-3' /> :
                    <CheckCircleIcon className='text-green-500 w-6 h-6 mr-3' />}
                    
                    <p>{orderStatus}</p>
                </div>

                <div className='flex text-indigo-700'>
                    <Link to="" className='px-2  border-r-2 border-gray-300'>
                        View Product
                    </Link>
                    <Link className='px-2 '>
                        Buy again
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default OrderList