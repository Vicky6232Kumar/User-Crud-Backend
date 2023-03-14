import React from 'react'
import Spinner from './loading.gif'

const Loading = () => {
  return (
    <div >
        <img className= "mx-auto"src={Spinner} alt="Loading" />
    </div>
  )
}

export default Loading