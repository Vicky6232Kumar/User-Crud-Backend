import React from 'react'
import MetaData from '../layouts/MetaData'
import ProductList from '../products/ProductList'
import CategoryFilter from '../products/CategoryFilter'

export default function Home() {

  return (
    <div className="bg-white">
      <MetaData title='Home' />
      
      <ProductList/>
      {/* <CategoryFilter /> */}
      
    </div>
  )
}
