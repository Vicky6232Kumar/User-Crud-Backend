import { combineReducers, applyMiddleware } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { profileReducer, userReducer } from './reducers/userReducer';
import {  productDetailsReducer, productReducer } from './reducers/productReducer';
import { cartReducer } from './reducers/cartReducer';

const reducers = combineReducers(
    {
        users: userReducer,
        profile: profileReducer,
        products: productReducer,
        productDetails : productDetailsReducer,
        cart : cartReducer
    }
)

const cartItems = localStorage.getItem("cartItems") !== null ? JSON.parse(localStorage.getItem("cartItems")) : [];
const shippingInfo = localStorage.getItem("shippingInfo") ? JSON.parse(localStorage.getItem("shippingInfo")) : {};
let initialState = {
    
    cart: {
        cartItems: cartItems,
        shippingInfo : shippingInfo
    }

}


const middleware = [thunk];

const store = configureStore({ reducer: reducers }, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store;
