import { PlayCircleIcon } from "@heroicons/react/24/outline";
import axios from "axios"

import { ALL_PRODUCTS_REQUEST, ALL_PRODUCTS_SUCCESS,ALL_PRODUCTS_FAIL, CLEAR_ERRORS, PRODUCT_DETAILS_REQUEST,PRODUCT_DETAILS_FAIL,PRODUCT_DETAILS_SUCCESS } from "../constants/productsConstant";

export const getAllProducts = (keyword= "" , currentPage = 1, price = [0,100000]) => async(dispatch) => {
    try {
        dispatch({type: ALL_PRODUCTS_REQUEST })

        let link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}`;

        const {data} = await axios.get(link)

        dispatch({
            type: ALL_PRODUCTS_SUCCESS,
            payload : data
        })
    } catch (error) {
        dispatch({
            type: ALL_PRODUCTS_FAIL,
            payload : error.response.data.message
        })
    }
}

// Getting a single product details

export const getProductDetails = (id) => async(dispatch) => {
    try {
        dispatch({type: PRODUCT_DETAILS_REQUEST })

        const {data} = await axios.get(`/api/v1/product/${id}`)

        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload : data.product
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload : error.response.data.message
        })
    }
}
export const clearError = () => async(dispatch) =>{
    dispatch({type: CLEAR_ERRORS})
}