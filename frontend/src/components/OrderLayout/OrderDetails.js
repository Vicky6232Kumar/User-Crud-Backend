import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { ArrowSmallRightIcon } from '@heroicons/react/24/solid'
import { useDispatch, useSelector } from 'react-redux'
import Spinner from '../layouts/Loading'
import { clearError, getOrderDetails } from '../../actions/orderAction'
import { useAlert } from 'react-alert'
import { CheckCircleIcon } from '@heroicons/react/24/solid'

const OrderDetails = () => {

  const { id } = useParams()
  const dispatch = useDispatch();
  const alert = useAlert();

  const { loading, error, order } = useSelector((state) => state.orderDetails)

  useEffect(() => {
    if (error) {
      alert.error(error)
      dispatch(clearError())

    }

    dispatch(getOrderDetails(id))


  }, [error, dispatch, alert, id])


  return (
    <div className='my-12  max-w-7xl mx-auto'>
      {loading ? <Spinner /> :

        <div className=' py-16 px-8 rounded-lg bg-gray-100'>


          <div className='flex justify-between'>
            <div className='flex items-center '>
              <p className='text-3xl font-bold'>Order #{order._id} </p>
              <p className=' flex items-end ml-4 text-indigo-500 text-sm'> <span>View invoice</span>  <span ><ArrowSmallRightIcon className='ml-1 h-4 w-4' /></span></p>
            </div>

            <div className='flex text-md' >
              <p className='text-gray-500'> Order Placed </p>
              <p className='ml-2 font-semibold'>{String(order.createdAt).substring(0, 10)}</p>

            </div>
          </div>



          {order.orderItems && order.orderItems.map((product) => (


            <div key={product._id} >
              <div className='my-8 rounded-lg border border-gray-300 bg-white'>

                <div className='flex border-b p-8  pb-6 border-gray-300'>

                  <div className="h-40 w-40 mr-4 flex-shrink-0 overflow-hidden rounded-md border border-gray-300 bg-gray-500">
                    <img
                      src="https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg"
                      alt="img"
                      className="h-full w-full object-cover object-center bg-gray-300 "
                    />
                  </div>

                  <div className='ml-3 w-2/5'>
                    <p className='font-semibold'>{product.name}</p>
                    <p className='font-semibold my-2'>₹{product.price}</p>
                    <p className='text-gray-500'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Harum ex omnis impedit ratione quaerat facilis placeat dolorum illum quam beatae. Eveniet, culpa facilis?</p>
                  </div>
                  <div className='ml-10 w-1/5'>
                    <p className=' mb-2'>Delivery address</p>
                    <p className='text-gray-500 text-sm'>{order.shippingInfo.address}
                      <p>{order.shippingInfo.pincode} <span> {order.shippingInfo.city}</span></p>
                      <p>{order.shippingInfo.state}, <span>{order.shippingInfo.country}</span></p>
                    </p>
                  </div>
                  <div className='w-1/5 ml-8'>
                    <p className=' mb-2'>Billing Info</p>
                    <p className='text-gray-500 text-sm'>
                      <p>{order.shippingInfo.name}</p>
                      <p>{order.shippingInfo.phoneNo}</p>
                      <p>{order.shippingInfo.email}</p>
                    </p>



                  </div>

                </div>


                <div className='p-8'>
                  prepare
                </div>

              </div>
            </div>

          ))}


          {order.shippingInfo && <div className='flex bg-[#e1e1e17a] rounded-lg p-8 text-sm'>

            <div className='w-1/4'>
              <p className='font-semibold mb-6'>Billing address</p>
              <p className='text-gray-500 text-sm'>{order.shippingInfo.address}
                <p>{order.shippingInfo.pincode} <span> {order.shippingInfo.city}</span></p>
                <p>{order.shippingInfo.state}, <span>{order.shippingInfo.country}</span></p>
              </p>
            </div>
            <div className='w-1/3'>
              <p className='font-semibold mb-6'>Payment information</p>
              <p >{order.paymentInfo.id}</p>
              <p className='flex items-center mt-3'>
                <CheckCircleIcon className='text-green-500 w-6 h-6 mr-2' />
                <p>{order.paymentInfo.status}</p>
              </p>
            </div>
            <div className='w-2/5 '>
              <div className='flex pb-4 border-b border-gray-300 justify-between '>
                <p >Subtotal</p>
                <p className='font-semibold'>₹{order.itemsPrice}</p>
              </div>
              <div className='flex py-4 border-b border-gray-300 justify-between '>
                <p>Shipping</p>
                <p className='font-semibold'>₹{order.shippingPrice}</p>
              </div>
              <div className='flex py-4 border-b border-gray-300 justify-between '>
                <p>Tax</p>
                <p className='font-semibold'>₹{order.taxPrice}</p>
              </div>
              <div className='flex py-4 justify-between font-semibold '>
                <p>Order total</p>
                <p className='text-indigo-600'>₹{order.totalPrice}</p>
              </div>

            </div>
          </div>}


        </div>}
    </div>
  )
}

export default OrderDetails