import { combineReducers, applyMiddleware } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { profileReducer, userReducer } from './reducers/userReducer';
import { productDetailsReducer, productReducer,newReviewReducer } from './reducers/productReducer';
import { cartReducer } from './reducers/cartReducer';
import {newOrderReducer, myOrdersReducer, orderDetailsReducer} from './reducers/orderReducer'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'


const persistConfig = {
    key: 'cartItems',
    version: 1,
    storage,
}

const persistedReducer = persistReducer(persistConfig, cartReducer)

const reducers = combineReducers(
    {
        users: userReducer,
        profile: profileReducer,
        products: productReducer,
        productDetails: productDetailsReducer,
        cart: persistedReducer,
        newOrder : newOrderReducer,
        myOrders: myOrdersReducer,
        orderDetails: orderDetailsReducer,
        newReview : newReviewReducer
    }
)

let initialState = {}

const middleware = [thunk];

const store = configureStore({ reducer: reducers },initialState, composeWithDevTools(applyMiddleware(...middleware)))

export let persistor = persistStore(store)

export default store;
