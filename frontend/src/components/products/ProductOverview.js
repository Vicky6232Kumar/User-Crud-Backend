
import { useState, useEffect, useRef } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { StarIcon } from '@heroicons/react/20/solid'
import { PlusIcon ,MinusIcon } from '@heroicons/react/24/outline'
import { RadioGroup } from '@headlessui/react'
import { clearError, getProductDetails, newReview } from '../../actions/productsAction'
import Spinner from '../layouts/Loading'
import MetaData from '../layouts/MetaData'
import ReviewCard from './ReviewCard'
import { useAlert } from 'react-alert'
import { addToCart } from '../../actions/cartAction'
import { NEW_REVIEW_RESET } from '../../constants/productsConstant'


const producting = {


  href: '#',

  images: [
    {
      src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg',
      alt: 'Two each of gray, white, and black shirts laying flat.',
    },
    {
      src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg',
      alt: 'Model wearing plain black basic tee.',
    },
    {
      src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg',
      alt: 'Model wearing plain gray basic tee.',
    },
    {
      src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-featured-product-shot.jpg',
      alt: 'Model wearing plain white basic tee.',
    },
  ],
  colors: [
    { name: 'White', class: 'bg-white', selectedClass: 'ring-gray-400' },
    { name: 'Gray', class: 'bg-gray-200', selectedClass: 'ring-gray-400' },
    { name: 'Black', class: 'bg-gray-900', selectedClass: 'ring-gray-900' },
  ],
  sizes: [
    { name: 'XXS', inStock: false },
    { name: 'XS', inStock: true },
    { name: 'S', inStock: true },
    { name: 'M', inStock: true },
    { name: 'L', inStock: true },
    { name: 'XL', inStock: true },
    { name: '2XL', inStock: true },
    { name: '3XL', inStock: true },
  ],
  description:
    'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
  highlights: [
    'Hand cut and sewn locally',
    'Dyed with our proprietary colors',
    'Pre-washed & pre-shrunk',
    'Ultra-soft 100% cotton',
  ],
  details:
    'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
}


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}



const ProductOverview = () => {


  const reference = useRef(null);
  const { id } = useParams()
  const alert = useAlert();
  const dispatch = useDispatch();
  const { error, product, loading } = useSelector(state => state.productDetails)
  const { success, error: reviewError } = useSelector(state => state.newReview)
  const [selectedColor, setSelectedColor] = useState(producting.colors[0])
  const [selectedSize, setSelectedSize] = useState(producting.sizes[2])
  const [quantity, setQuantity] = useState(1)
  const [disable, setDisable] = useState(false)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState("")
  useEffect(() => {
    if(error){
      alert.error(error)
      dispatch(clearError())
    }
    if(reviewError){
      alert.reviewError(reviewError)
      dispatch(clearError())

    }
    if(success){
      alert.success("Review submitted")
      dispatch({type: NEW_REVIEW_RESET})
      setComment("")
      setRating(0)

    }
    dispatch(getProductDetails(id))
  }, [dispatch, id ,alert, error, reviewError, success])


  const handleScroll = (elementRef) => {
    window.scrollTo({
      top: elementRef.current.offsetTop,
      behavior: "smooth"
    })
  }

  const addToCartHandler = (e) => {
    e.preventDefault();

    if (product.stock < quantity) {
      alert.info("Reach maximum limit")
      setDisable(true)
    }
    else {
      dispatch(addToCart(id, quantity))
      setQuantity(quantity + 1)
      alert.success("Item Added to Cart")
    }
  }

  const reviewSubmitHandler =(e) => {
    e.preventDefault()
    const reviewData = {
      rating,
      comment,
      productId :id
    }
    dispatch(newReview(reviewData))

   
  }

  const increaseRating =() =>{
    if(rating<5){
      setRating(rating+1)
    }
    
  }
  const decreaseRating = () =>{
    if(rating>0){
      setRating(rating-1)
    }

   

  }

  return (

    <div className="bg-white">
      <MetaData title="Buy product | Shoppyy" />
      {loading ? <Spinner /> :
        <div className="pt-6">

          {/* Image gallery */}
          <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
            <div className="aspect-w-3 aspect-h-4 hidden overflow-hidden rounded-lg lg:block">
              <img
                src={producting.images[0].src}
                alt={producting.images[0].alt}
                className="h-full w-full object-cover object-center"
              />
            </div>
            <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
              <div className="aspect-w-3 aspect-h-2 overflow-hidden rounded-lg">
                <img
                  src={producting.images[1].src}
                  alt={producting.images[1].alt}
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <div className="aspect-w-3 aspect-h-2 overflow-hidden rounded-lg">
                <img
                  src={producting.images[2].src}
                  alt={producting.images[2].alt}
                  className="h-full w-full object-cover object-center"
                />
              </div>
            </div>
            <div className="aspect-w-4 aspect-h-5 sm:overflow-hidden sm:rounded-lg lg:aspect-w-3 lg:aspect-h-4">
              <img
                src={producting.images[3].src}
                alt={producting.images[3].alt}
                className="h-full w-full object-cover object-center"
              />
            </div>
          </div>

          {/* Product info */}
          <div className="mx-auto max-w-2xl px-4 pt-10 pb-16 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pt-16 lg:pb-24 ">

            <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{product.ProductName}</h1>
            </div>

            {/* Options */}
            <div className="mt-4 lg:row-span-3 lg:mt-0">
              <h2 className="sr-only">Product information</h2>
              <p className="text-3xl tracking-tight text-gray-900">₹ {product.price}</p>

              {/* Reviews */}
              <div className="mt-6">
                <h3 className="sr-only">Reviews</h3>
                <div className="flex items-center">
                  <div className="flex items-center"><span className='pr-1'>{product.ratings}</span>
                    {[0, 1, 2, 3, 4].map((rating) => (
                      <StarIcon
                        key={rating}
                        className={classNames(
                          product.ratings > rating ? 'text-yellow-600' : 'text-gray-200',
                          'h-5 w-5 flex-shrink-0'
                        )}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <p className="sr-only">{product.ratings} out of 5 stars</p>
                  <div className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500 cursor-pointer" onClick={() => handleScroll(reference)} >
                    {product.numOfReviews} reviews
                  </div>
                </div>
              </div>

              <form className="mt-10">
                {/* Colors */}
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Color</h3>

                  <RadioGroup value={selectedColor} onChange={setSelectedColor} className="mt-4">
                    <RadioGroup.Label className="sr-only"> Choose a color </RadioGroup.Label>
                    <div className="flex items-center space-x-3">
                      {producting.colors.map((color) => (
                        <RadioGroup.Option
                          key={color.name}
                          value={color}
                          className={({ active, checked }) =>
                            classNames(
                              color.selectedClass,
                              active && checked ? 'ring ring-offset-1' : '',
                              !active && checked ? 'ring-2' : '',
                              'relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none'
                            )
                          }
                        >
                          <RadioGroup.Label as="span" className="sr-only">
                            {' '}
                            {color.name}{' '}
                          </RadioGroup.Label>
                          <span
                            aria-hidden="true"
                            className={classNames(
                              color.class,
                              'h-8 w-8 rounded-full border border-black border-opacity-10'
                            )}
                          />
                        </RadioGroup.Option>
                      ))}
                    </div>
                  </RadioGroup>
                </div>

                {/* Sizes */}
                <div className="mt-10">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-900">Size</h3>
                    <Link to="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                      Size guide
                    </Link>
                  </div>

                  <RadioGroup value={selectedSize} onChange={setSelectedSize} className="mt-4">
                    <RadioGroup.Label className="sr-only"> Choose a size </RadioGroup.Label>
                    <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
                      {producting.sizes.map((size) => (
                        <RadioGroup.Option
                          key={size.name}
                          value={size}
                          disabled={product.stock === 0}
                          className={({ active }) =>
                            classNames(
                              size.inStock
                                ? 'cursor-pointer bg-white text-gray-900 shadow-sm'
                                : 'cursor-not-allowed bg-gray-50 text-gray-200',
                              active ? 'ring-2 ring-indigo-500' : '',
                              'group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6'
                            )
                          }
                        >
                          {({ active, checked }) => (
                            <>
                              <RadioGroup.Label as="span">{size.name}</RadioGroup.Label>
                              {size.inStock ? (
                                <span
                                  className={classNames(
                                    active ? 'border' : 'border-2',
                                    checked ? 'border-indigo-500' : 'border-transparent',
                                    'pointer-events-none absolute -inset-px rounded-md'
                                  )}
                                  aria-hidden="true"
                                />
                              ) : (
                                <span
                                  aria-hidden="true"
                                  className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                                >
                                  <svg
                                    className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                                    viewBox="0 0 100 100"
                                    preserveAspectRatio="none"
                                    stroke="currentColor"
                                  >
                                    <line x1={0} y1={100} x2={100} y2={0} vectorEffect="non-scaling-stroke" />
                                  </svg>
                                </span>
                              )}
                            </>
                          )}
                        </RadioGroup.Option>
                      ))}
                    </div>
                  </RadioGroup>
                </div>


                {product.stock === 0 ?
                  <div className='mt-10 text-3xl tracking-tight text-gray-900 '>
                    Out of stock
                  </div> :
                  <button
                    type="submit"
                    className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    onClick={addToCartHandler} disabled={disable}
                  >
                    Add to bag
                  </button>}


              </form>
            </div>

            {/* Description and details */}

            <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pt-6 lg:pb-16 lg:pr-8">
              <div>
                <h3 className="sr-only">Description</h3>

                <div className="space-y-6">
                  <p className="text-base text-gray-900">{producting.description}</p>
                </div>
              </div>

              <div className="mt-10">
                <h3 className="text-sm font-medium text-gray-900">Highlights</h3>

                <div className="mt-4">
                  <ul className="list-disc space-y-2 pl-4 text-sm">
                    {producting.highlights.map((highlight) => (
                      <li key={highlight} className="text-gray-400">
                        <span className="text-gray-600">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-10">
                <h2 className="text-sm font-medium text-gray-900">Details</h2>

                <div className="mt-4 space-y-6">
                  <p className="text-sm text-gray-600">{producting.details}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Reviews info */}

          <div className="review-info mx-auto max-w-2xl px-4  pb-16 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8  lg:pb-24" ref={reference}>

            <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
              <h1 className="text-xl tracking-tight  text-indigo-500 border-b-2 border-indigo-500 w-fit pb-6">Customer Review</h1>
            </div>

            {/* Write a review */}
            <div className="mt-4 lg:row-span-3 lg:mt-0">
              <p className="text-2xl tracking-tight text-gray-900">Submit a review</p>



              <form className="mt-10" action="#" method="POST" onSubmit={reviewSubmitHandler}>

                {/* Write Reviews */}

                <div className="mt-6">
                  <h3 className="sr-only">Reviews</h3>
                  <div className="flex items-center">
                    <div className="flex items-center"> 
                    <span > <MinusIcon className='mr-2 w-7 p-1 h-7 border border-gray-200 rounded-2xl hover:bg-gray-200 cursor-pointer' onClick={decreaseRating}/> </span>  
                    <span className='pr-1'>{rating}</span>
                      {[0, 1, 2, 3, 4].map((ratings) => (
                        <StarIcon
                          key={ratings}
                          className={classNames(
                            rating > ratings ? 'text-yellow-600' : 'text-gray-200',
                            'h-5 w-5 flex-shrink-0'
                          )}
                          aria-hidden="true"
                          values={rating}
                          onChange={(e) => setRating(e.target.value)}
                        />
                      ))}

                      <span> <PlusIcon  className='ml-2 w-7 p-1 h-7 border border-gray-200 rounded-2xl hover:bg-gray-200 cursor-pointer' onClick={increaseRating}/> </span>
                    </div>
                  </div>
                </div>

                <textarea name="" id="" rows="5" className=' mt-6 border border-gray-300 p-2 w-full resize-none' required
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                ></textarea>


                <button
                  type="submit"
                  className="mt-6 flex  items-center justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-base font-medium text-white hover:bg-indigo-700" disabled = {rating===0? true: false}
                > 
                  Add to bag
                </button>
              </form>


            </div>

            {/* See all reviews */}

            <div className=" lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200  lg:pb-16 lg:pr-8 py-8">

              {product.reviews && product.reviews[0] ? <div>
                <div className="space-y-6">
                  <p className="text-base text-gray-900">

                    {product.reviews && product.reviews.map((review) =>
                      <ReviewCard review={review} key={review._id} />
                    )}

                  </p>
                </div>
              </div> : "No review "}


            </div>
          </div>


        </div>
      }

    </div>
  )
}

export default ProductOverview
