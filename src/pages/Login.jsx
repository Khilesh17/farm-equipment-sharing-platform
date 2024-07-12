import { useState } from "react"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { RxCross2 } from "react-icons/rx";
import { login } from "../services/operations/authAPI"
import google from "../assets/icons/google-icon.png"
import linkedin from "../assets/icons/linkedin-icon.png"
import facebook from "../assets/icons/facebook-icon.png"

function Login() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const [showPassword, setShowPassword] = useState(false)

  const { email, password } = formData

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }))
  }

  const handleOnSubmit = (e) => {
    e.preventDefault()
    dispatch(login(email, password, navigate))
  }

  return (
    <div className="h-screen w-screen flex font-montserrat">

      {/* Left side */}
      <div className="w-7/12 p-4">
        <div className="">
          <h1 className="text-4xl font-luckiest">
            <span className="text-black">FARM </span>
            <span className="text-green-400">SHARE</span>
          </h1>

          <div className="p-8 flex flex-col justify-center items-center">
            <h1 className="font-extrabold text-green-500 text-2xl">Login To Your Account</h1>
            <div className="mt-1 w-[78px] h-[4px] bg-green-500"></div>

            <div className="flex gap-10 pt-6">
              <Link to={'/not-working'}>
                <img
                  src={linkedin}
                  alt="google"
                  className="w-10"
                />
              </Link>
              <Link to={'/not-working'}>
                <img
                  src={google}
                  alt="google"
                  className="w-10"
                />
              </Link>
              <Link to={'/not-working'}>
                <img
                  src={facebook}
                  alt="google"
                  className="w-10"
                />
              </Link>
            </div>
            <p className="mt-3 font-montserrat">or user your email account</p>

            <form
              onSubmit={handleOnSubmit}
              className="mt-6 flex w-full flex-col gap-y-6"
            >
              <label className="w-full">
                <input
                  required
                  type="text"
                  name="email"
                  value={email}
                  onChange={handleOnChange}
                  placeholder="Enter email address"
                  className="w-full rounded-[0.3rem] border-2 outline-none border-green-500 p-[12px] text-black placeholder:text-green-500"
                />
              </label>
              <label className="relative">
                <input
                  required
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={password}
                  onChange={handleOnChange}
                  placeholder="Enter Password"
                  className="w-full rounded-[0.3rem] border-2 outline-none border-green-500 p-[12px] text-black placeholder:text-green-500"
                />
                <span
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-[15px] z-[10] cursor-pointer"
                >
                  {showPassword ? (
                    <AiOutlineEyeInvisible fontSize={24} fill="#268C43" />
                  ) : (
                    <AiOutlineEye fontSize={24} fill="#268C43" />
                  )}
                </span>

              </label>

              <div className="flex justify-between font-semibold px-6">
                <p className="flex gap-1.5">
                  <input
                    className=""
                    type="checkbox"
                    id="remember"
                  />
                  <label
                    htmlFor="remember"
                  >Remember me</label>
                </p>

                <Link to="/forgot-password">
                  <p>
                    Forgot Password ?
                  </p>
                </Link>
              </div>

              <button
                type="submit"
                className="rounded-[6px] bg-green-500 py-[8px] px-[12px] font-extrabold text-white hover:bg-green-400 w-1/2 xl:w-1/4 mx-auto drop-shadow-lg"
              >
                LOGIN
              </button>
            </form>

            <div className="w-full flex justify-between mt-6 px-6">
              <p>
                Privacy Policy
              </p>
              <p>
                Terms and Condition
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side  */}
      <div className="w-5/12 bg-green-500 text-white p-6">
        <div className="w-full text-right">
          <button
            className="text-3xl"
            onClick={() => navigate("/")}
          >
            <RxCross2 />
          </button>
        </div>

        <div className="text-center mt-28">
          <h1 className="text-3xl font-extrabold">Welcome</h1>
          <div className="mt-1 w-[94px] h-[4px] bg-white mx-auto"></div>
          <p className="mt-8 text-xl">Fill up your Personal information and start your journey with us !</p>
          <button
            className="rounded-[6px] bg-green-500 py-[8px] px-10 font-extrabold text-white mx-auto mt-8 drop-shadow-xl shadow-2xl text-xl"
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  )
}

export default Login