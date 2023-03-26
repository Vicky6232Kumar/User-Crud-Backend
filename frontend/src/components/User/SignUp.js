import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../../actions/userAction";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "../layouts/Loading"
import { EyeSlashIcon, EyeIcon } from '@heroicons/react/20/solid'

const SignUp = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, loading } = useSelector(state => state.users)
  const [seePassword, setSeePassword] = useState("password")
  const [credential, setcredential] = useState({
    username: "",
    email: "",
    password: "",
  });

  const { username, email, password } = credential

  const [avatar, setAvatar] = useState()

  const signUpSubmit = async (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("username", username);
    myForm.set("email", email)
    myForm.set("avatar", avatar)
    myForm.set("password", password)

    dispatch(signup(myForm))
  }

  const onChange = (e) => {

    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatar(reader.result);
        }
      }
      reader.readAsDataURL(e.target.files[0]);

    }
    else {
      setcredential({ ...credential, [e.target.name]: e.target.value });
    }

  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate])

  const viewPassword = () => {
    if (seePassword === "password") {
      setSeePassword("text")
    }
    else {
      setSeePassword("password")
    }

  }


  return (
    <div className="flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8">
      {loading ? <Spinner /> : <div className="w-full max-w-sm space-y-8">
        <div className="text-center text-2xl ">Create a account</div>

        <form
          className="mt-8 "
          action="#"
          method="POST"
          encType="multipart/form-data"
          onSubmit={signUpSubmit}
        >
          <div>
            <div className="flex items-center pb-2">

              <div className="shrink-0">
                <img className="h-16 w-16 object-cover rounded-full" src={avatar} alt=" Profile" />
              </div>
              <input
                id="avatar"
                name="avatar"
                type="file"
                accept="image/*"
                required
                className="block my-2 rounded-md mx-4 placeholder:text-gray-400  focus:z-10 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 text-sm text-slate-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-violet-50 file:text-violet-700
                hover:file:bg-violet-100"
                onChange={onChange}
              />
            </div>
            <div className="py-2">
              <label htmlFor="username" className="font-semibold">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                className="block w-full my-2 rounded-md p-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                onChange={onChange}
                value={credential.username}
              />
            </div>

            <div className="pb-2">
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
                onChange={onChange}
                value={credential.email}
              />
            </div>



            <div className="">
              <label htmlFor="password" className="font-semibold">
                Password
              </label>
              <input
                id="password"
                name="password"
                type={seePassword}
                autoComplete="current-password"
                required
                className="block w-full my-2 rounded-md p-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                onChange={onChange}
                value={credential.password}
              />
              {seePassword === "password" ? <EyeSlashIcon className="relative -top-[2.3rem] left-[21rem] h-5 w-5 cursor-pointer text-gray-400 group-hover:text-gray-500" aria-hidden="true" onClick={viewPassword} /> :
                <EyeIcon className="relative -top-[2.3rem] left-[21rem] h-5 w-5 cursor-pointer text-gray-400 group-hover:text-gray-500" aria-hidden="true" onClick={viewPassword} />
              }
            </div>

            {/* <div>
              <label htmlFor="cpassword" className="font-semibold">
                Confirm your Password
              </label>
              <input
                id="cpassword"
                name="cpassword"
                type="password"
                autoComplete="current-password"
                required
                className="block w-full my-2 rounded-md p-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                onChange={onChange}
                value={credential.cpassword}
              />
            </div> */}
          </div>

          <div className="mt-0">
            <button
              type="submit"
              className="group  flex w-full justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign in to account
            </button>
          </div>
        </form>
      </div>}
    </div>
  )
}

export default SignUp