import { CLEAR_ERRORS, LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS, SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAIL, LOAD_USER_FAIL, LOAD_USER_SUCCESS, LOAD_USER_REQUEST, LOGOUT_SUCCESS, LOGOUT_FAIL, UPDATE_PROFILE_SUCCESS, UPDATE_PROFILE_REQUEST, UPDATE_PROFILE_FAIL, UPDATE_PROFILE_RESET,
UPDATE_PASSWORD_FAIL, UPDATE_PASSWORD_REQUEST,UPDATE_PASSWORD_RESET,UPDATE_PASSWORD_SUCCESS } from "../constants/userConstant"


export const userReducer = (state = { user: {} }, action) => {

    switch (action.type) {
        case LOGIN_REQUEST:
        case SIGNUP_REQUEST:
        case LOAD_USER_REQUEST:

            return {
                isAuthenticated: false

            }

        case LOGIN_SUCCESS:
        case SIGNUP_SUCCESS:
        case LOAD_USER_SUCCESS:

            return {
                ...state,
                isAuthenticated: true,
                user: action.payload
            }

        case LOGOUT_SUCCESS:
            return {
                isAuthenticated: false,
                user: null
            }

        case LOGIN_FAIL:
        case SIGNUP_FAIL:

            return {
                ...state,
                isAuthenticated: false,
                user: null,
                error: action.payload
            }

        case LOAD_USER_FAIL:

            return {
                isAuthenticated: false,
                user: null,
                error: action.payload
            }

        case LOGOUT_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case CLEAR_ERRORS:

            return {
                ...state,
                error: null
            }


        default:
            return state;
    }
}

export const profileReducer = (state = {}, action) => {

    switch (action.type) {
        case UPDATE_PROFILE_REQUEST:
            case UPDATE_PASSWORD_REQUEST:

            return {
                ...state,
                isAuthenticated: false

            }

        case UPDATE_PROFILE_SUCCESS:
            case UPDATE_PASSWORD_SUCCESS:

            return {
                ...state,
                isUpdated: action.payload
            }

        case UPDATE_PROFILE_FAIL:
            case UPDATE_PASSWORD_FAIL:

            return {
                ...state,
                error: action.payload
            }

        case UPDATE_PROFILE_RESET:
            case UPDATE_PASSWORD_RESET:

            return {
                ...state,
                isUpdated: false
            }

        case CLEAR_ERRORS:

            return {
                ...state,
                error: null
            }


        default:
            return state;
    }
}