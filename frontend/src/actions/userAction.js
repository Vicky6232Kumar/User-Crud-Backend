import axios  from "axios";

import { CLEAR_ERRORS, LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS, SIGNUP_FAIL, SIGNUP_REQUEST, SIGNUP_SUCCESS, LOAD_USER_REQUEST, LOAD_USER_SUCCESS, LOAD_USER_FAIL, LOGOUT_SUCCESS, LOGOUT_FAIL,
    UPDATE_PROFILE_SUCCESS, UPDATE_PROFILE_REQUEST, UPDATE_PROFILE_FAIL, UPDATE_PROFILE_RESET,
    UPDATE_PASSWORD_FAIL, UPDATE_PASSWORD_REQUEST,UPDATE_PASSWORD_RESET,UPDATE_PASSWORD_SUCCESS } from "../constants/userConstant"


// Login Action
export const login = (email, password) => async(dispatch)=> {
    try {
        dispatch({type: LOGIN_REQUEST})
        const {data} = await axios.post(
            `/api/v2/login`, 
            {email, password},
            {
                headers:{
                    "Content-Type": "application/json"
                } 
            }
        );

        dispatch({type: LOGIN_SUCCESS, payload:data.user})

    } 
    catch (error) {
        dispatch({type:LOGIN_FAIL, payload: error.response.data.message})
    }
};

// Signup Action

export const signup = (userData) => async(dispatch)=> {
    try {
        dispatch({type: SIGNUP_REQUEST})
        const {data} = await axios.post( `/api/v2/user/new`, 
            userData,
            {
                headers:{
                    "Content-Type": "multipart/form-data"
                } 
            }
        );

        dispatch({type: SIGNUP_SUCCESS, payload:data.user})

    } 
    catch (error) {
        dispatch({type:SIGNUP_FAIL, payload: error.response.data.message})
    }
};

// Get loggedin or signned user

export const loadUser = () => async(dispatch)=> {
    try {
        dispatch({type: LOAD_USER_REQUEST})
        const {data} = await axios.get(
            `/api/v2/user/profile`
        );

        dispatch({type: LOAD_USER_SUCCESS, payload:data.user})

    } 
    catch (error) {
        dispatch({type:LOAD_USER_FAIL, payload: error.response.data.message})
    }
};

// Logout the user

export const logout = () => async(dispatch)=> {
    try {

        const {data} = await axios.get(`/api/v2/logout`);

        dispatch({type: LOGOUT_SUCCESS, payload:data.user})

    } 
    catch (error) {
        dispatch({type:LOGOUT_FAIL, payload: error.response.data.message})
    }
};


// Update Profile

export const updateProfile = (userData) => async(dispatch)=> {
    try {
        dispatch({type: UPDATE_PROFILE_REQUEST})
        const {data} = await axios.put( `/api/v2/user/profile/update`, 
            userData,
            {
                headers:{
                    "Content-Type": "multipart/form-data"
                } 
            }
        );

        dispatch({type: UPDATE_PROFILE_SUCCESS, payload:data.user})

    } 
    catch (error) {
        dispatch({type:UPDATE_PROFILE_FAIL, payload: error.response.data.message})
    }
};


// Update User loggedin password

export const updatePassword = (password) => async(dispatch)=> {
    try {
        dispatch({type: UPDATE_PASSWORD_REQUEST})
        const {data} = await axios.put( `/api/v2/user/password/update`, 
            password,
            {
                headers:{
                    "Content-Type": "application/json"
                } 
            }
        );

        dispatch({type: UPDATE_PASSWORD_SUCCESS, payload:data.user})

    } 
    catch (error) {
        dispatch({type:UPDATE_PASSWORD_FAIL, payload: error.response.data.message})
    }
};

export const clearError = () => async(dispatch) =>{
    dispatch({type: CLEAR_ERRORS})
}

