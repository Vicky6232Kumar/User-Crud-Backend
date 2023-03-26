import React, { useState } from "react";
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { removeFromCart, saveShippingInfo } from "../../actions/cartAction";
import { useAlert } from 'react-alert'
import { Country, State } from 'country-state-city'

const Checkout = () => {

  const { cartItems, shippingInfo } = useSelector(state => state.cart)

  const alert = useAlert();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  

  const [address, setAddress] = useState(shippingInfo.address)
  const [city, setCity] = useState(shippingInfo.city)
  const [state, setState] = useState(shippingInfo.state)
  const [country, setCountry] = useState(shippingInfo.country)
  const [pincode, setPincode] = useState(shippingInfo.pincode)
  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo)
  const [email, setEmail] = useState(shippingInfo.email)

  // const [subTotal, setSubTotal] = useState()
  // const [total, setTotal] = useState()


  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id))
    alert.success("Item Removed")

  }

  

  const shippingSubmit = (e) => {
    e.preventDefault();
    
    if(phoneNo.length <10 || phoneNo.length>10) {
      alert.message("Phone number should 10 digit")
      return;
    }
    dispatch(saveShippingInfo({address, city ,state, country, pincode, phoneNo}))
    navigate('/order/confirm')
    // sessionStorage.setItem("orderInfo", JSON.stringify({}))
  }

  // const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)}
  // const shippingCharges = subtotal>1000 ? 0 :100
  // const tax = subtotal * 0.18;
  // const total  = subtotal+shippingCharges+tax;


  

  return (
  

    <div >
      

      {cartItems.length === 0 ?
        <div className="flex flex-col items-center justify-center mt-32">
          <p className="text-base tracking-tight  text-gray-500">Your shopping bag is empty !!</p>

          <Link to="/products">
            <div className='w-[20rem] p-2 mt-6 bg-indigo-600 text-white text-center hover:bg-indigo-500 rounded-lg'>Continue shopping</div>
          </Link>

        </div>
        :
        <div className='flex max-w-7xl mx-auto  '>

          <div className='w-1/2 p-10 bg-[#e7e7e76c]'>

            <div className="flex h-full flex-col ">

              <div className="flex-1 py-6 px-4 sm:px-6">

                <div className="flex items-start justify-between">
                  <div className="text-lg font-medium text-gray-900">Order Summary</div>
                </div>

                <div className="mt-8">
                  <div className="flow-root">
                    <ul className="-my-6 divide-y divide-gray-200">
                      {cartItems.map((product) => (
                        <li key={product.product} className="flex py-6">
                          <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                            <img
                              src="https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg"
                              alt={product.imageAlt}
                              className="h-full w-full object-cover object-center"
                            />
                          </div>

                          <div className="ml-4 flex flex-1 flex-col">
                            <div>
                              <div className="flex justify-between text-base font-medium text-gray-900">
                                <h3>
                                  <a href={product.href}>{product.name}</a>
                                </h3>
                                <p className="ml-4">₹{product.price * product.quantity}</p>
                              </div>
                              <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                            </div>
                            <div className="flex flex-1 items-end justify-between text-sm">
                              <p className="text-gray-500">Qty {product.quantity}</p>

                              <div className="flex">
                                <button
                                  type="button"
                                  className="font-medium text-indigo-600 hover:text-indigo-500" onClick={() => removeFromCartHandler(product.product)}
                                >
                                  Remove
                                </button>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 py-4 px-4 sm:px-6">

                <div className="flex justify-between text-base text-gray-900">
                  <p className="text-gray-500">Subtotal</p>
                  <p className="font-medium">₹{`${cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)}`}</p>

                </div>
                <div className="flex justify-between text-base py-4  text-gray-900">
                  <p className="text-gray-500">Shipping </p>
                  <p className="font-medium">₹100</p>

                </div>
                <div className="flex justify-between text-base  text-gray-900">
                  <p className="text-gray-500">Taxes</p>
                  <p className="font-medium">₹400</p>

                </div>

              </div>

              <div className="border-t border-gray-300 py-6 px-4 sm:px-6">
                <div className="flex justify-between text-base font-medium text-gray-900">
                  <p >Total</p>
                  <p>₹total</p>

                </div>
              </div>


            </div>

          </div>

          <div className="p-10 bg-[#f7f7f76e] ">

            <form encType="multipart/form-data" onSubmit={shippingSubmit} >
              <div>

                <div className="pt-6 ">


                  <h2 className=" leading-7 text-gray-900 text-lg font-medium ">Contact information</h2>

                  <div className="w-3/5">


                    <div className="mt-6 ">
                      <label htmlFor="phone" className=" block text-sm font-medium leading-6 text-gray-900">
                        Phone No.
                      </label>
                      <div className="mt-2 w-3/5">
                        <input
                          required
                          type="phone"
                          name="phone"
                          autoComplete="phone"
                          className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6"
                          value={phoneNo} size="10"
                          onChange={(e) => setPhoneNo(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="mt-6">
                      <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                        Email address
                      </label>
                      <div className="mt-2">
                        <input
                          required
                          id="email"
                          name="email"
                          type="email"
                          autoComplete="email"
                          className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                    </div>

                  </div>

                </div>

                <div className="border-b border-gray-900/10 pt-10 pb-12">
                  <h2 className=" leading-7 text-gray-900 text-lg font-medium t">Shipping address</h2>

                  <div className="mt-6 grid grid-cols-1 gap-y-8 gap-x-6 sm:grid-cols-6">


                    <div className="sm:col-span-4">
                      <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                        Country
                      </label>
                      <div className="mt-2">
                        <select
                          required
                          name="country"
                          autoComplete="country-name"
                          className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300  sm:max-w-xs sm:text-sm sm:leading-6"
                          value={country}
                          onChange={(e) => setCountry(e.target.value)}
                        >
                          <option>Country</option>
                          {Country &&
                            Country.getAllCountries().map((item) =>
                              <option key={item.isoCode} value={item.isoCode}>{item.name}</option>
                            )
                          }
                        </select>
                      </div>
                    </div>

                    <div className="col-span-full">
                      <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
                        Street address
                      </label>
                      <div className="mt-2">
                        <input
                          required
                          type="text"
                          name="street-address"
                          id="street-address"
                          autoComplete="street-address"
                          className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}

                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2 sm:col-start-1">
                      <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                        City
                      </label>
                      <div className="mt-2">
                        <input
                          required
                          type="text"
                          name="city"
                          id="city"
                          autoComplete="address-level2"
                          className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300  sm:text-sm sm:leading-6"
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label htmlFor="region" className="block text-sm font-medium leading-6 text-gray-900">
                        State / Province
                      </label>
                      <div className="mt-2">
                        <select
                          required
                          name="region"
                          autoComplete="address-level1"
                          className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6"
                          value={state}
                          onChange={(e) => setState(e.target.value)}
                        >
                          <option>State</option>
                          {State && State.getStatesOfCountry(country).map((item) =>
                            <option key={item.isoCode} value={item.isoCode}>{item.name}</option>)
                          }
                        </select>
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900">
                        ZIP / Postal code
                      </label>
                      <div className="mt-2">
                        <input
                          required
                          type="text"
                          name="postal-code"
                          id="postal-code"
                          autoComplete="postal-code"
                          className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6 appearance-none"
                          value={pincode}
                          onChange={(e) => setPincode(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                </div>


                <div className="mt-6 flex items-center justify-between gap-x-6">
                  <button type="button" className="text-md font-normal leading-6 text-gray-500">
                    You won't be charged until the next step.
                  </button>
                  <button
                    type="submit"
                    className="rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    disabled={state ? false : true}
                  >
                    Continue
                  </button>
                </div>

              </div>

            </form>



          </div>

        </div>

      }


    </div>

  )
}


export default Checkout