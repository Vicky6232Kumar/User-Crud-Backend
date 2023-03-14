import React, { useState , useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux'
import {clearError, login} from '../../actions/userAction'
import Spinner from  '../layouts/Loading'


const Login = ({showAlert}) => {
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const  {isAuthenticated, error, loading }  = useSelector(state => state.users)

    const [credential, setcredential] = useState({ email: "", password: "" });
    

    const loginSubmit = async (e) => {
        e.preventDefault();
        dispatch(login(credential.email, credential.password))
        
    }   
    const onChange = (e) => {
        setcredential({ ...credential, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        if(error){
            showAlert(error)
            dispatch(clearError())
        }

      if(isAuthenticated){
        showAlert('Login Successfull')
        navigate("/account");
      }
      
    }, [isAuthenticated,navigate, error, dispatch, showAlert ])
    


    return (
        <div className="flex items-center justify-center py-24 px-4 sm:px-6 lg:px-8">
            { loading ?  <Spinner/> : <div className="w-full max-w-sm space-y-8">
                <div className="text-center text-2xl ">Login to a account</div>

                <form
                    className="mt-8 "
                    action="#"
                    method="POST"
                    onSubmit={loginSubmit}
                >
                    <div className="">

                        <div className="py-2">
                            <label htmlFor="email" className="pt-4 font-semibold">
                                Email Address
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className=" block w-full my-2 rounded-md p-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                                value={credential.email}
                                onChange={onChange}
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="font-semibold">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="block w-full mt-2 rounded-md p-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                                value={credential.password} onChange={onChange}
                            />
                        </div>
                    </div>

                    <div className="text-right text-blue-500 mt-2 mb-6 ">
                        <Link to="/signup" rel="noopener noreferrer">
                            Forget Password?
                        </Link>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="group  flex w-full justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Sign in to account
                        </button>
                    </div>
                </form>

                <div className="text-center ">
                    <Link to="/signup" rel="noopener noreferrer">
                        Don't have an account?
                    </Link>
                </div>
            </div>}
        </div>
    )
}

export default Login