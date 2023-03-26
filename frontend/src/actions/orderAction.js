import {CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, CREATE_ORDER_FAIL, CLEAR_ERRORS, MY_ORDERS_REQUEST, MY_ORDERS_SUCCESS, MY_ORDERS_FAIL} from '../constants/orderConstant'
import axios from 'axios'

// Create Order

export const createOrder = (order) => async(dispatch) =>{
    try {
        dispatch({type: CREATE_ORDER_REQUEST})
        const {data} = await axios.post('/api/v3/order/new', order,
        {
            headers:{
                "Content-type" : "application/json"
            }
        })

        dispatch({
            type:CREATE_ORDER_SUCCESS,
            payload: data
        })
        
    } catch (error) {
        dispatch({
            type: CREATE_ORDER_FAIL,
            payload: error.response.data.message
        })
        
    }
}


// My order

export const myOrders = () => async(dispatch) =>{
    try {
        dispatch({type: MY_ORDERS_REQUEST})
        const {data} = await axios.get('/api/v3/orders/my')

        dispatch({
            type:MY_ORDERS_SUCCESS,
            payload: data.orders
        })
        
    } catch (error) {
        dispatch({
            type: MY_ORDERS_FAIL,
            payload: error.response.data.message
        })
        
    }
}

export const clearError = () => async(dispatch) =>{
    dispatch({type: CLEAR_ERRORS})
}