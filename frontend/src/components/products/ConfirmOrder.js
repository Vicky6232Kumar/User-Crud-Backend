import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'


const ConfirmOrder = () => {

    const { cartItems, shippingInfo } = useSelector(state => state.cart)
    const [value, setValue] = useState(0)
    const data = JSON.parse(sessionStorage.getItem("orderInfo"))


    const handleUPI = () => {

        setValue(1)

    }
    const handleCard = () => {

        setValue(2)
    }
    const handleCOD = () => {

        setValue(3)
    }


    return (
        <div className='flex max-w-7xl mx-auto mt-20'>
            <div className='flex flex-col border-r-2 border-gray-100 w-2/3'>
                <div>
                    <p className='text-2xl'>Shipping info</p>
                    <div className='p-2 mt-4 text-base'>
                        <p>Name: <span className="text-gray-500"> {shippingInfo.name} </span></p>
                        <p>Phone: <span className="text-gray-500"> {shippingInfo.phoneNo}</span></p>
                        <p>Email: <span className="text-gray-500"> {shippingInfo.email}</span></p>
                        <p>Address: <span className="text-gray-500">{`${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pincode}` }</span></p>
                    </div>
                </div>

                <div className='mt-8 '>
                    <p className='text-2xl'>Your Cart Item :</p>
                    <div className="p-2">
                        <div className="flow-root">
                            <ul >
                                {cartItems.map((product) => (
                                    <li key={product.product} className="flex py-6">
                                        <div className="h-24 w-32 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                            <img
                                                src="https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg"
                                                alt={product.imageAlt}
                                                className="h-full w-full object-cover object-center"
                                            />
                                        </div>

                                        <div className="mx-8 flex justify-between items-center text-base font-medium text-gray-900 w-full">
                                            <h3>
                                                <p >{product.name}</p>
                                            </h3>
                                            <p className="ml-4 text-gray-500"><span>{product.quantity}</span> X <span>₹{product.price} = </span> <span className='text-gray-900'>₹{product.price * product.quantity}</span> </p>
                                        </div>
                                        {/* <p className="mt-1 text-sm text-gray-500">{product.color}</p> */}


                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div className='mx-auto mt-24'>
                <p className='text-2xl mb-6'>Order Summary</p>
                <p>Total payable amount : <span> ₹{data.total}</span></p>
                <div className=' mt-12'>
                    <p className='text-2xl  '>Choose Payment Method</p>
                    <div className='mt-8 text-md text-center '>

                        <div className={value===1 ? `my-2 p-2 bg-indigo-600 border border-black rounded-md cursor-pointer text-white` :`my-2 p-2 border border-black rounded-md cursor-pointer`} onClick={handleUPI}>UPI</div>
                        <div className={value===2 ? `p-2 bg-indigo-600 rounded-md border border-black cursor-pointer text-white` :`p-2 border border-black cursor-pointer rounded-md`} onClick={handleCard}>Card</div>
                        <div className={value===3 ? `my-2 p-2 bg-indigo-600 rounded-md border border-black cursor-pointer text-white` :`my-2 p-2 border border-black cursor-pointer rounded-md`} onClick={handleCOD}>Cash on delivery</div>

                    </div>
                    <div className='mt-8 text-lg text-center '>
                        <button className='my-4  py-2 rounded-md bg-indigo-600 text-sm font-semibold text-white shadow-sm '>
                            {value === 1 && <Link to="/order/payment/upi/process" className='py-2 px-4'>Proceed to payment</Link> }
                            {value === 2 && <Link to="/order/payment/card/process" className='py-2 px-4'>Proceed to payment</Link>}
                            {value ===3 && <div className='px-8'>Confirm Order</div>}
                        </button>

                        
                    </div>

                </div>
            </div>
        </div>

    )
}

export default ConfirmOrder