import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearError, myAllOrders } from '../../actions/orderAction'
import CartHeader from '../OrderLayout/CartHeader'
import Spinner from '../layouts/Loading'
import OrderList from '../OrderLayout/OrderList'

const MyOrders = () => {

  const dispatch = useDispatch();
  const { loading, error, orders } = useSelector(state => state.myOrders)

  useEffect(() => {
    if (error) {
      dispatch(clearError())
    }
    dispatch(myAllOrders())
  }, [error, dispatch])

  return (

    <div className='mt-12 max-w-6xl mx-auto '>
      {loading ? <Spinner /> :
        <div >
          {
            orders.map((order) => (
              <div className='border border-gray-300 p-10 mb-10 rounded-lg'>
                <div className='bg-gray-100 rounded-lg p-4'>
                  <CartHeader key={order._id} order={order} />
                </div>
               

                {order.orderItems.map((product) => (
                  <OrderList key={product._id} product={product} orderStatus = {order.orderStatus} />
                ))}


              </div>
            )
            )
          }
        </div>}


    </div>

  )
}

export default MyOrders