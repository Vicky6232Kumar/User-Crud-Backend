import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { clearError, loadUser, updateProfile } from '../../actions/userAction'
import { useSelector, useDispatch } from "react-redux";
import { UPDATE_PROFILE_RESET } from "../../constants/userConstant";
import Spinner from '../layouts/Loading'


const UpdateAccount = ({ showAlert }) => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector(state => state.users)
  const { isUpdated, loading, error } = useSelector((state) => state.profile)

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [avatar, setAvatar] = useState()

  const updateProfileSubmit = async (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("email", email)
    myForm.set("avatar", avatar)

    dispatch(updateProfile(myForm))

  }

  const updateProfileChange = (e) => {

    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatar(reader.result);
      }
    }
    reader.readAsDataURL(e.target.files[0]);



  };

  useEffect(() => {

    if (user) {
      setName(user.username)
      setEmail(user.email)
      setAvatar(user.avatar.url)
    }
    if (error) {
      showAlert("Something wents wrong")
      dispatch(clearError())
    }
    if (isUpdated) {
      showAlert("Profile Updated")
      dispatch(loadUser)
      navigate("/account");
      dispatch({
        type: UPDATE_PROFILE_RESET
      })
    }
  }, [user, dispatch, isUpdated, navigate, showAlert, error])

  return (
    <div className="flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8">
      {loading ? <Spinner /> :
        <div className="w-full max-w-sm space-y-8">
          <div className="text-center text-2xl ">Update Profile</div>

          <form
            className="mt-8 space-y-4"
            action="#"
            method="POST"
            encType="multipart/form-data"
            onSubmit={updateProfileSubmit}
          >
            <div>

              <div >
                <label htmlFor="avatar" className="font-semibold">
                  Select New Profile Image
                </label>
                <div className="flex items-center py-2 " >
                  <div className="shrink-0">
                    <img className="h-16 w-16 object-cover rounded-full" src={avatar} alt=" Profile" />
                  </div>
                  <input
                    id="avatar"
                    name="avatar"
                    type="file"
                    accept="image/*"
                    className="block my-2 rounded-md mx-4 placeholder:text-gray-400  focus:z-10 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 text-sm text-slate-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-violet-50 file:text-violet-700
                hover:file:bg-violet-100"
                    onChange={updateProfileChange}
                  />
                </div>
              </div>

              <div className="py-2">
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
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="pb-2" >
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
                  onChange={(e) => setEmail(e.target.value)}
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
        </div>}
    </div>
  )
}

export default UpdateAccount