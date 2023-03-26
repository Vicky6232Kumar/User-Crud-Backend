import { useEffect } from "react";
import Spinner from '../layouts/Loading'
import { useSelector, useDispatch } from "react-redux"
import { getAllProducts } from "../../actions/productsAction";
import ProductCard from "./ProductCard";



const ProductList = () => {

  const { loading, products } = useSelector(state => state.products)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProducts())
  }, [dispatch])


  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Customers also purchased</h2>

        {loading ? <Spinner /> :
          <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {products.map((product) => (
              <ProductCard product={product} key={product._id} />
            ))}
          </div>
        }


      </div>
    </div>
  )
}


export default ProductList