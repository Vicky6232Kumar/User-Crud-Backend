import React from "react";
import { Link } from "react-router-dom";
import { logout } from '../../actions/userAction';
import {useDispatch,useSelector} from 'react-redux'


const Navbar = ({showAlert}) => {

  const dispatch = useDispatch();
  const  {isAuthenticated, user}  = useSelector(state => state.users)

  const logoutUser = (e) =>{
    e.preventDefault();
    dispatch(logout())
    showAlert("Logout Successfully")
  }
 
  return (
    <div className="flex justify-between items-center bg-white shadow-xl z-10">
      <div className="flex justify-center items-center md:order-2">
        <div className=" m-0.5 py-3 px-2.5  md:hidden " >
          <div className="bg-black w-7 h-0.5 my-1"></div>
          <div className="bg-black w-7 h-0.5"></div>
          <div className="bg-black w-7 h-0.5 my-1"></div>
        </div>
      </div>

      <div className="w-7/12 md:order-1 flex my-1">

        <div
          id="services"
          className=" service absolute bg-zinc-100 w-full left-0 top-16 z-30  transition md:translate-x-0 md:flex justify-center items-center md:static md:bg-white"
        >
          <div className="p-3 cursor-pointer hover:underline hover:underline-offset-8  text-sm">
          <Link to="/" rel="noopener noreferrer">
              Home
            </Link>
          </div>
          <div className="p-3 text-sm cursor-pointer hover:underline hover:underline-offset-8 ">
          <Link to="/news" rel="noopener noreferrer">
            News
            </Link>
          </div>
          <div className="p-3 text-sm hover:underline hover:underline-offset-8 ">
            <Link to="/about" rel="noopener noreferrer">
            About
            </Link>
          </div>
          <div className="p-3 text-sm hover:underline hover:underline-offset-8 ">
            <Link to="/request" rel="noopener noreferrer">
            Requests
            </Link>
          </div>
          <div className="p-3 text-sm cursor-pointer hover:underline hover:underline-offset-8 ">
          <Link to="/Feed" rel="noopener noreferrer">
            Feed
            </Link>
          </div>
          
          {isAuthenticated? <div className="p-3 text-sm cursor-pointer hover:underline hover:underline-offset-8 ">
          <Link to="/account" rel="noopener noreferrer">
              Account
            </Link>
          </div> : ""}

          {( isAuthenticated &&  user.role === "admin") ? <div className="p-3 text-sm cursor-pointer hover:underline hover:underline-offset-8 ">
          <Link to="/admin" rel="noopener noreferrer">
              Admin
            </Link>
          </div> : ""}
          
        </div>

      </div>

      <div className="md:order-3 flex justify-center items-center">
          
          {isAuthenticated ? 
            <div className="mr-2 p-2 ">
            <span className="material-symbols-outlined md:ml-4 bg-indigo-600 text-white rounded-md p-2 cursor-pointer" onClick={logoutUser}>
            Logout
            </span>
          </div>
          
           : <div className="mr-2 p-2 ">
           <span className="material-symbols-outlined md:-ml-28 ">
             <Link to="/login" rel="noopener noreferrer" className="p-2">
               Login
             </Link>
           </span>
           <span className="material-symbols-outlined md:ml-4 bg-indigo-600 text-white rounded-md p-2">
             <Link to="/signup" rel="noopener noreferrer" className="p-2">
               Signup
             </Link>
           </span>
         </div> }
        
          
         
          
        
      </div>
    </div>
  )
}

export default Navbar