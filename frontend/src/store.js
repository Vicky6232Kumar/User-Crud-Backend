import {combineReducers, applyMiddleware } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import { profileReducer, userReducer } from './reducers/userReducer';

const reducers = combineReducers(
    {users: userReducer,
    profile :profileReducer}
)

let initialState = {}

const middleware = [thunk];

const store = configureStore({reducer: reducers}, initialState, composeWithDevTools(applyMiddleware(...middleware)) )

export default store;
