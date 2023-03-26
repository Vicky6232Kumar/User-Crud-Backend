import React from 'react'
import { StarIcon } from '@heroicons/react/20/solid'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}


const ReviewCard = ({ review }) => {
  return (
    <div className='flex pb-6'>

      <div>
        <img src="https://res.cloudinary.com/dbpwwmtti/image/upload/v1679160078/avatars/hxukatqyop364ovx00px.jpg" alt="img" className='w-10 rounded-full'/>
      </div>

      <div className='ml-6 pr-4 border-b border-gray-300 w-3/4'>

        <div className=''>{review.name}</div>

        <div className='text-gray-600 text-sm'> 2023, 19 Mar</div>

        <div className='py-3'>

          <div className="flex items-center"><span className='pr-1'>{review.rating}</span>
            {[0, 1, 2, 3, 4].map((rating) => (
              <StarIcon
                key={rating}
                className={classNames(
                  review.rating > rating ? 'text-yellow-600' : 'text-gray-200',
                  'h-5 w-5 flex-shrink-0'
                )}
                aria-hidden="true"
              />
            ))}
          </div>

        </div>
        <div className='pb-8 text-gray-400'>{review.comment}</div>
      </div>

    </div>
  )
}

export default ReviewCard