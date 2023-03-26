import { ADD_TO_CART, REMOVE_CART_ITEM,SAVE_SHIPPING_INFO } from "../constants/cartConstant";
import axios from "axios";



// Add to cart

export const addToCart = (id, quantity) => async (dispatch, getState) => {

    const { data } = await axios.get(`/api/v1/product/${id}`);

    dispatch({
        type: ADD_TO_CART,
        payload: {
            product: data.product._id,
            name: data.product.ProductName,
            price: data.product.price,
            image: data.product.images[0].url,
            stock: data.product.stock,
            quantity
        }
    })

    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems))

};


// Remove from cart

export const removeFromCart = (id) => async (dispatch, getState) => {

    dispatch({
        type: REMOVE_CART_ITEM,
        payload: id
        
    })

    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems))

};


// Shipping Informations


export const saveShippingInfo = (data) => async (dispatch) => {

    dispatch({
        type: SAVE_SHIPPING_INFO,
        payload: data
        
    })

    localStorage.setItem("shippingInfo", JSON.stringify(data))

};