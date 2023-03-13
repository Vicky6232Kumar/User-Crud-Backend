import React, { useState , useEffect } from "react";
import {  useNavigate } from "react-router-dom";
import { loadUser, updateProfile } from '../../actions/userAction'
import { useSelector, useDispatch } from "react-redux";
import { UPDATE_PROFILE_RESET } from "../../constants/userConstant";


const UpdateAccount = ({showAlert}) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {user} = useSelector(state => state.users)
    const { isUpdated } = useSelector((state) => state.profile)

    const [name, setName] = useState("")
    const [email , setEmail] = useState("")
    const [avatar, setAvatar] = useState() 

    const updateProfileSubmit = async (e) =>{
        e.preventDefault();
        const myForm = new FormData();
        myForm.set("name", name);
        myForm.set("email", email)
        myForm.set("avatar", avatar)

        dispatch(updateProfile(myForm))
        
      }

      const updateProfileChange = (e) => {

            const reader = new FileReader();

            reader.onload = () =>{
                if(reader.readyState === 2){
                    setAvatar(reader.result);
                }
            }
            reader.readAsDataURL(e.target.files[0]);

        
        
      };

      useEffect(() => {
        
        if(user){
            setName(user.username)
            setEmail(user.email)
            setAvatar(user.avatar.url)
        }
        if(isUpdated){
          showAlert("Profile Updated")
            dispatch(loadUser)
          navigate("/account");
          dispatch({
            type:UPDATE_PROFILE_RESET
          })
        }
      }, [user,dispatch,isUpdated,navigate, showAlert])
      
  return (
    <div className="flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-sm space-y-8">
        <div className="text-center text-2xl ">Update Profile</div>

        <form
          className="mt-8 space-y-6"
          action="#"
          method="POST"
          encType="multipart/form-data"
          onSubmit={updateProfileSubmit}
        >
          <div>
            <div>
              <label htmlFor="name" className="font-semibold">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                className="block w-full my-2 rounded-md p-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                value={name}
                onChange={(e)=>setName(e.target.value)}
              />
            </div>

            <div className="py-2">
              <label htmlFor="email" className="py-4 font-semibold">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className=" block w-full my-2 rounded-md p-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
              />
            </div>

            <div className="pb-2">
              <label htmlFor="password" className="font-semibold">
                Select New Profile Image <img src={avatar} alt="" />
              </label>
              <input
                id="avatar"
                name="avatar"
                type="file"
                accept="image/*"
                className="block w-full my-2 rounded-md p-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                onChange={updateProfileChange}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group  flex w-full justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default UpdateAccount