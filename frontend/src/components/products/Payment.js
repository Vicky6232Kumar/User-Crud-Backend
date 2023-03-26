import React, {useEffect, useRef } from 'react'
import {  useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useAlert } from 'react-alert'
import {
  CardNumberElement, CardCvcElement, CardExpiryElement, useStripe, useElements,
} from '@stripe/react-stripe-js';
import axios from 'axios';
import {createOrder, clearError} from '../../actions/orderAction'



const Payment = () => {

  const navigate = useNavigate();
  const alert = useAlert();
  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useSelector(state => state.users)
  const btnPay = useRef()

  const { shippingInfo, cartItems } = useSelector(state => state.cart)
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"))
  const {error} = useSelector((state) => state.newOrder)

  const paymentData = {
    amount: Math.round(orderInfo.total * 100)
  }

  const order = {
    shippingInfo,
    orderItems : cartItems,
    itemsPrice: orderInfo.subtotal,
    shippingPrice : orderInfo.shippingCharges,
    taxPrice : orderInfo.tax,
    totalPrice : orderInfo.total,
    
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    btnPay.current.disabled = true;

    try {
      const {data} = await axios.post("/api/v4/payment/process", paymentData, 
      {headers:{
        "content-Type" : "application/json"}
      })

      const client_secret = data.client_secret;

      if(!stripe || !elements ) return;

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method:{
          card : elements.getElement(CardNumberElement),
          billing_details:{
            name : user.username,
            email: user.email,
            address:{
              line1: shippingInfo.address,
              city: shippingInfo.city,
              state: shippingInfo.state,
              postal_code: shippingInfo.pincode,
              country: shippingInfo.country
            }
          }
        }
      })
      if(result.error){
        btnPay.current.disabled = false;
        alert.error(result.error.message)
      }
      else{
        if(result.paymentIntent.status === "succeeded"){

          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status
          }

          dispatch(createOrder(order))
          navigate("/success")
        }
        else{
          alert.error("There is payment issue")
        }
      }
      
    } catch (error) {
      btnPay.current.disabled = false;
      alert.error(error.response.data.message)
    }
  }

  useEffect(() => {
    if(error){
      alert.error(error)
      dispatch(clearError())
    }
  }, [error, dispatch, alert])
  

  return (
    <div className="flex items-center justify-center py-24 px-4 sm:px-6 lg:px-8 ">
      <div className="w-full max-w-sm space-y-8">
        <div className="text-center text-2xl ">Payment Gateway</div>
        <form
          className="mt-8 "
          action="#"
          method="POST"
          onSubmit={(e) => submitHandler(e)}
        >
          <div >

            <div className="py-3">
              <label  className="pt-4 font-semibold">
                Card Number
              </label>
              <CardNumberElement className=" block w-full my-2 rounded-md p-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6" />

            </div>

            <div className="w-full">
              <label  className="font-semibold">
                Expiry
              </label>
              <CardExpiryElement className="block w-full my-2 rounded-md p-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6" />

            </div>

            <div className="w-full py-3">
              <label className="font-semibold">
                CVV
              </label>
              <CardCvcElement className="block w-full my-2 rounded-md p-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6" />

            </div>
          </div>


          <div>
            <button
              type="submit" ref={btnPay}
              className="group mx-auto flex w-1/3 justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white hover:bg-indigo-500"
            >
             Pay
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Payment